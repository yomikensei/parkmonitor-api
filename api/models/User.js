/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const bcrypt = require('bcrypt');

module.exports = {
  fetchRecordsOnUpdate: true,
  attributes: {
    name_first: {
      type: 'string',
      required: true,
    },
    name_last: {
      type: 'string',
      required: true,
    },
    email: {
      unique: true,
      type: 'string',
      required: true,
    },
    vehicles: {
      collection: 'Vehicle',
      via: 'user',
    },
    password: {
      type: 'string',
    },
  },
  beforeCreate: (values, cb) => {
    bcrypt.hash(values.password, 10, (err, hash) => {
      if (err) return cb(err);
      // eslint-disable-next-line no-param-reassign
      values.password = hash;
      cb();
    });
  },
  beforeUpdate(values, cb) {
    if (values.password) {
      bcrypt.hash(values.password, 10, (err, hash) => {
        if (err) return cb(err);
        // eslint-disable-next-line no-param-reassign
        values.password = hash;
        cb();
      });
    } else cb();
  },
  customToJSON() {
    return _.omit(this, ['password']);
  },
};
