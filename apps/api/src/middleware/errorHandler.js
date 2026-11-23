const ApiError = require('../utils/ApiError');
const env = require('../config/env');

function notFoundHandler(req, res, next) {
	next(ApiError.notFound(`Route ${req.method} ${req.originalUrl} not found`));
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
	const statusCode = err.statusCode || 500;
	if (statusCode >= 500) console.error(`${req.method} ${req.originalUrl} - ${err.message}`);

	res.status(statusCode).json({
		success: false,
		message: err.message || 'Internal server error',
		details: err.details,
		...(env.nodeEnv === 'development' ? { stack: err.stack } : {}),
	});
}

module.exports = { notFoundHandler, errorHandler };
