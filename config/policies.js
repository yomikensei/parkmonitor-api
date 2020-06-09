/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  // '*': true,

  AuthController: {
    signup: true,
    login: true,
  },

  UserController: {
    read: ['isAuthorized'],
    list: ['isAuthorized'],
  },
  VehicleController: {
    create: ['isAuthorized'],
    list: ['isAuthorized'],
  },
  SlotController: {
    '*': true,
  },
  ReservationController: {
    create: ['isAuthorized'],
    list: ['isAuthorized'],
  },
};
