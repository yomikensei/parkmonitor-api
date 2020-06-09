/**
 * Vehicle.js
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
    brand: {
      type: 'String',
      required: true,
    },
    model: {
      type: 'String',
      required: true,
    },
    plate: {
      type: 'String',
      required: true,
    },
  },
};
