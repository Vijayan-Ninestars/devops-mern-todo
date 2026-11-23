class ApiResponse {
	static send(res, statusCode, data, message = 'Success') {
		return res.status(statusCode).json({ success: statusCode < 400, message, data });
	}

	static ok(res, data, message = 'Success') {
		return ApiResponse.send(res, 200, data, message);
	}

	static created(res, data, message = 'Created successfully') {
		return ApiResponse.send(res, 201, data, message);
	}
}

module.exports = ApiResponse;
