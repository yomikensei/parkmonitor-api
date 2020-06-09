/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require('bcrypt');

module.exports = {
  _config: {
    actions: false,
    shortcuts: false,
    rest: false,
  },
  async read(req, res) {
    try {
      const {
        user: {
          data: { id },
        },
      } = req;
      const user = await User.findOne({ id });
      return res.json(user);
    } catch (err) {
      res.serverError(err);
    }
  },
};
