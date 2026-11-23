const { Router } = require('express');
const todosRoutes = require('../modules/todos/todos.routes');

const router = Router();

router.use('/todos', todosRoutes);

module.exports = router;
