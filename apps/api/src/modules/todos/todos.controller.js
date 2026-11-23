const ApiResponse = require('../../utils/ApiResponse');
const service = require('./todos.service');

async function list(req, res) {
	return ApiResponse.ok(res, await service.list());
}

async function create(req, res) {
	const todo = await service.create(req.body);
	return ApiResponse.created(res, todo, 'Todo created');
}

async function update(req, res) {
	return ApiResponse.ok(res, await service.update(req.params.id, req.body), 'Todo updated');
}

async function toggle(req, res) {
	return ApiResponse.ok(res, await service.toggle(req.params.id));
}

async function remove(req, res) {
	const todo = await service.remove(req.params.id);
	return ApiResponse.ok(res, todo, 'Todo deleted');
}

module.exports = { list, create, update, toggle, remove };
