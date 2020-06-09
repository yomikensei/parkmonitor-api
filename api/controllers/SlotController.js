/**
 * SlotController
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
      const { label } = req.body;
      const label_used = await Slot.findOne({ label });
      if (label_used) return ResponseHelper.json(400, res, 'Label has already been used');
      const code = Math.random().toString(36).substring(7).toUpperCase();
      let slot = await Slot.create({ ...req.body, code }).fetch();
      slot = { ...slot };
      return ResponseHelper.json(201, res, 'Slot added successfully', slot);
    } catch (e) {
      return ResponseHelper.error(e, res);
    }
  },
  list: async (req, res) => {
    try {
      const { per_page, page: _page } = req.query;
      const perPage = per_page || 20;
      const page = _page || 1;
      const skip = perPage * (page - 1);
      const records = await Slot.find({ limit: perPage, skip });
      const count = await Slot.count();
      const meta = {
        page,
        prev_page: page > 1 ? page - 1 : false,
        per_page: perPage,
        next_page: count - (skip + perPage) > 0 ? page + 1 : false,
        page_count: Math.ceil(count / perPage),
        total: count,
      };
      return ResponseHelper.json(200, res, 'Slots retrieved successfully', records, meta);
    } catch (e) {
      return ResponseHelper.error(e, res);
    }
  },
};
