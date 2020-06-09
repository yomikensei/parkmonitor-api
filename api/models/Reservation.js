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
    slot: {
      model: 'Slot',
    },
    code: {
      type: 'string',
    },
    duration: {
      type: 'number',
      required: true,
      min: 1,
    },
    status: {
      type: 'string',
      isIn: ['active', 'inactive'],
    },
  },
};
