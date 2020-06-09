/**
/**
* Slot.js
*
* @description :: A model definition represents a database table/collection.
* @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
*/

module.exports = {
  fetchRecordsOnUpdate: true,

  attributes: {
    label: {
      type: 'string',
      required: true,
    },
    coordinates: {
      type: 'json',
      required: true,
    },
    is_occupied: {
      type: 'boolean',
      defaultsTo: false,
    },
    user: {
      type: 'number',
      allowNull: true,
    },
  },
};
