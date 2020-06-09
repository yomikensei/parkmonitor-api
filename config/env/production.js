module.exports = {
  port: process.env.PORT || 1337,
  secret: process.env.SECRET,
  datastores: {
    mongo: {
      adapter: require('sails-mongo'),
      url: process.env.MONGO_URL,
    },
  },
  custom: {
    raven: {
      dsn: process.env.SENTRY_DSN
    },
  },
  models: {
    datastore: 'mongo',
    migrate: 'safe',
  },
  blueprints: {
    rest: false,
    actions: false,
    shortcuts: false,
  },
  session: {
    cookie: {
      secure: true,
    },
  },
  sockets: {
    onlyAllowOrigins: [],
  },
  security: {
    cors: {
      allRoutes: true,
      allowOrigins: '*',
      allowCredentials: false,
      allowRequestHeaders: '*',
    },
  },
};
