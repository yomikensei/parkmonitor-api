/**
 * VehicleController
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
      const { plate } = req.body;
      const plate_used = await Vehicle.findOne({ plate });
      if (plate_used) return ResponseHelper.json(400, res, 'Plate number is already taken');
      const { id: user } = req.user;
      let vehicle = await Vehicle.create({ ...req.body, user }).fetch();
      vehicle = { ...vehicle };
      return ResponseHelper.json(201, res, 'Vehicle added successfully', vehicle);
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
      const records = await Vehicle.find({ limit: perPage, skip, where: criteria });
      const count = await Vehicle.count(criteria);
      const meta = {
        page,
        prev_page: page > 1 ? page - 1 : false,
        per_page: perPage,
        next_page: count - (skip + perPage) > 0 ? page + 1 : false,
        page_count: Math.ceil(count / perPage),
        total: count,
      };
      return ResponseHelper.json(200, res, 'Vehicles retrieved successfully', records, meta);
    } catch (e) {
      return ResponseHelper.error(e, res);
    }
  },
};
