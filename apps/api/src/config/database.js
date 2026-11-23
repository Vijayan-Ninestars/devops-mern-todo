const { Pool } = require('pg');
const env = require('./env');

const pool = new Pool({
	host: env.db.host,
	port: env.db.port,
	user: env.db.user,
	password: env.db.password,
	database: env.db.database,
	max: 10,
});

pool.on('error', (err) => console.error(`Unexpected error on idle pg client: ${err.message}`));

module.exports = pool;
