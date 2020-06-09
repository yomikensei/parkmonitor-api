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
  'GET /user/all': {
    controller: 'UserController',
    action: 'list',
  },

  // Vehicle
  'POST /vehicle': {
    controller: 'VehicleController',
    action: 'create',
  },
  'GET /vehicle': {
    controller: 'VehicleController',
    action: 'list',
  },

  // Slot
  'POST /slot': {
    controller: 'SlotController',
    action: 'create',
  },
  'GET /slot': {
    controller: 'SlotController',
    action: 'list',
  },
  'PUT /slot/entry': {
    controller: 'SlotController',
    action: 'entry',
  },
  'PUT /slot/exit/:id': {
    controller: 'SlotController',
    action: 'exit',
  },

  // Reservation
  'POST /reservation': {
    controller: 'ReservationController',
    action: 'create',
  },
  'GET /reservation': {
    controller: 'ReservationController',
    action: 'list',
  },
};
