/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

const _ = require('lodash');
const Bcrypt = require('bcrypt');
const Crypto = require('crypto');
const Moment = require('moment');
const Raven = require('raven');
const ResponseHelper = require('@dsninjas/response');
const Schedule = require('node-schedule');
const { v4: uuidv4 } = require('uuid');

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

module.exports.bootstrap = async function (cb) {
  global._ = _;
  global.Bcrypt = Bcrypt;
  global.Capitalize = capitalize;
  global.Crypto = Crypto;
  global.Moment = Moment;
  global.Schedule = Schedule;
  global.UUID = uuidv4;

  process
    .on('unhandledRejection', (reason, p) => {
      // eslint-disable-next-line no-console
      console.error(reason, 'Unhandled Rejection at Promise', p);
    })
    .on('uncaughtException', (err) => {
      // eslint-disable-next-line no-console
      console.error(err, 'Uncaught Exception thrown');
      process.exit(1);
    });
  Raven.config(sails.config.custom.raven.dsn).install();
  global.ResponseHelper = new ResponseHelper(Raven);
  cb();
};
