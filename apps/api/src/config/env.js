const dotenv = require('dotenv');

dotenv.config();

function required(name) {
	const value = process.env[name];
	if (value === undefined) throw new Error(`Missing required environment variable: ${name}`);
	return value;
}

module.exports = {
	nodeEnv: process.env.NODE_ENV || 'development',
	port: Number(process.env.PORT || 5000),
	clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
	db: {
		host: process.env.DB_HOST || 'localhost',
		port: Number(process.env.DB_PORT || 5432),
		user: required('DB_USER'),
		password: required('DB_PASSWORD'),
		database: required('DB_NAME'),
	},
};
