/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require('bcrypt');

module.exports = {
  _config: {
    actions: true,
    shortcuts: false,
    rest: false
  },

  async signup(req, res) {
    try {
      const user = await User.create(req.body);
      return res.json({ user, token: jwtService.sign(user) });
    } catch (err) {
      return req.serverError(err);
    }
  },

  async login(req, res) {
    try {
      const { body: { email, password } } = req;
      if (!email || !password) {
        return res.badRequest({
          err: 'Email or password cannot be empty'
        });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.notFound({ err: 'Could not find email,' + email + ' sorry.' });
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        return res.json({ user, token: jwtService.sign(user) });
      }
      else { return res.forbidden({ err: 'Invalid password' }); }

    } catch (err) {
      return req.serverError(err);
    }
  },
  async read(req, res) {
    try {
      const { user: { data: { id } } } = req;
      const user = await User.findOne({ id });
      return res.json(user);
    } catch (err) {
      res.serverError(err);
    }
  },
};

