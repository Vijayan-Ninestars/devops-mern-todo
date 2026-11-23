const { Router } = require('express');
const controller = require('./todos.controller');
const validate = require('../../middleware/validate');
const { createTodoSchema, updateTodoSchema, toggleTodoSchema, idParamSchema } = require('./todos.validators');

const router = Router();

router.get('/', controller.list);
router.post('/', validate(createTodoSchema), controller.create);
router.put('/:id', validate(updateTodoSchema), controller.update);
router.patch('/:id/toggle', validate(toggleTodoSchema), controller.toggle);
router.delete('/:id', validate(idParamSchema), controller.remove);

module.exports = router;
