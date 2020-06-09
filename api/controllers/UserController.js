/**
 * UserController
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
  read: async (req, res) => {
    try {
      const { id } = req.user;
      const user = await User.findOne(id);
      if (!user) return ResponseHelper.json(404, res, 'Unable to retrieve user ');
      return ResponseHelper.json(200, res, 'User retrieved successfully', user);
    } catch (e) {
      return ResponseHelper.error(e, res);
    }
  },
};
