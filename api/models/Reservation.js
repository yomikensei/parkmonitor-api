/**
 * Reservation.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  fetchRecordsOnUpdate: true,
  attributes: {
    user: {
      model: 'User',
    },
    duration: {
      type: 'number',
    },
    slot: {
      model: 'Slot',
    },
    status: {
      type: 'string',
      isIn: ['active', 'inactive'],
    },
  },
};
