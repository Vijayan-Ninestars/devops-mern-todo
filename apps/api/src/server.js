const http = require('http');
const app = require('./app');
const env = require('./config/env');
const pool = require('./config/database');

const server = http.createServer(app);

server.listen(env.port, () => {
	console.log(`API listening on port ${env.port} [${env.nodeEnv}]`);
});

function shutdown(signal) {
	console.log(`${signal} received. Shutting down gracefully...`);
	server.close(async () => {
		await pool.end();
		process.exit(0);
	});
	setTimeout(() => process.exit(1), 10_000).unref();
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
