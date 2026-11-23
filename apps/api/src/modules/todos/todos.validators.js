const { z } = require('zod');
const { idParamSchema } = require('../../utils/commonSchemas');

const optionalText = (max) =>
	z
		.string()
		.trim()
		.max(max)
		.nullish()
		.transform((v) => v || null);

const details = {
	title: z.string().trim().min(1, 'Title is required').max(200),
	description: optionalText(500),
};

const createTodoSchema = z.object({ body: z.object(details) });

const updateTodoSchema = idParamSchema.merge(
	z.object({ body: z.object({ ...details, isDone: z.boolean().default(false) }) })
);

const toggleTodoSchema = idParamSchema;

module.exports = { createTodoSchema, updateTodoSchema, toggleTodoSchema, idParamSchema };
