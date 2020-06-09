/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  // Authentication
  'POST /auth/signup': {
    controller: 'AuthController',
    action: 'signup',
  },
  'POST /auth/login': {
    controller: 'AuthController',
    action: 'login',
  },

  // User
  'GET /user': {
    controller: 'UserController',
    action: 'read',
  },
};
