/**
 * ReservationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  _config: {
    actions: false,
    shortcuts: false,
    rest: false,
  },
  create: async (req, res) => {
    try {
      const { slot } = req.body;
      const slot_unavailable = await Reservation.findOne({ slot, status: 'active' });
      if (slot_unavailable) return ResponseHelper.json(400, res, 'Slot has already been reserved');
      const { id: user } = req.user;
      const code = Math.random().toString(36).substring(7).toUpperCase();
      let reservation = await Reservation.create({ ...req.body, user, status: 'active', code }).fetch();
      reservation = { ...reservation };
      await Slot.updateOne(slot).set({
        reservation: reservation.id,
      });
      const run_date = Date.now() + reservation.duration * 1000;
      // Deactivate reservation when duration is up
      Schedule.scheduleJob(run_date, async () => {
        await Reservation.updateOne(reservation.id).set({
          status: 'inactive',
        });
        await Slot.updateOne(slot).set({
          reservation: null,
          occupied_by: null,
        });
      });
      return ResponseHelper.json(201, res, 'Reservation created successfully', reservation);
    } catch (e) {
      return ResponseHelper.error(e, res);
    }
  },

  list: async (req, res) => {
    try {
      const { id: user } = req.user;
      const { per_page, page: _page } = req.query;
      const perPage = per_page || 20;
      const page = _page || 1;
      const skip = perPage * (page - 1);
      const criteria = { user };
      const records = await Reservation.find({ limit: perPage, skip, where: criteria }, { slot: true });
      const count = await Reservation.count(criteria);
      const meta = {
        page,
        prev_page: page > 1 ? page - 1 : false,
        per_page: perPage,
        next_page: count - (skip + perPage) > 0 ? page + 1 : false,
        page_count: Math.ceil(count / perPage),
        total: count,
      };
      return ResponseHelper.json(200, res, 'Reservations retrieved successfully', records, meta);
    } catch (e) {
      return ResponseHelper.error(e, res);
    }
  },
};
