module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'asset_service',
      timezone: 'UTC',
    },
  },
  testing: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'asset_service_testing',
      timezone: 'UTC',
    },
  },
  staging: {},
  production: {},
};
