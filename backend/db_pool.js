// pool.js
const { Pool } = require('pg');
const { getDatabaseUri } = require('./config');

const pool = new Pool({
  connectionString: getDatabaseUri(),
  // Add other pool configuration options if needed
});

module.exports = pool;
