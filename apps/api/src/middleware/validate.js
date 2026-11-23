const ApiError = require('../utils/ApiError');

/** Validates req.{body,query,params} against a Zod schema shaped { body, query, params }. */
function validate(schema) {
	return (req, res, next) => {
		const result = schema.safeParse({ body: req.body, query: req.query, params: req.params });
		if (!result.success) {
			// Key errors by field path without the body/query/params prefix, e.g. { title: ['Title is required'] }.
			const details = {};
			for (const issue of result.error.issues) {
				const key = issue.path.slice(1).join('.') || issue.path[0];
				(details[key] ??= []).push(issue.message);
			}
			return next(ApiError.badRequest('Validation failed', details));
		}
		req.body = result.data.body ?? req.body;
		req.query = result.data.query ?? req.query;
		req.params = result.data.params ?? req.params;
		next();
	};
}

module.exports = validate;
