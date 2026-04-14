require('dotenv').config();

module.exports = {
  development: {
    username: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || '',
    database: process.env.PGDATABASE || 'ecommerce',
    host: process.env.PGHOST || 'localhost',
    dialect: 'postgres',
  },
  production: {
    // Fill with production DB config
  },
};
