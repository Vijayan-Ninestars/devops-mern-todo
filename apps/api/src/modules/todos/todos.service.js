const repository = require('./todos.repository');
const ApiError = require('../../utils/ApiError');

async function list() {
	return repository.findAll();
}

async function getById(id) {
	const todo = await repository.findById(id);
	if (!todo) throw ApiError.notFound('Todo not found');
	return todo;
}

async function create(data) {
	return repository.create(data);
}

async function update(id, data) {
	await getById(id);
	return repository.update(id, data);
}

async function toggle(id) {
	await getById(id);
	return repository.toggle(id);
}

async function remove(id) {
	const todo = await getById(id);
	await repository.remove(id);
	return todo;
}

module.exports = { list, getById, create, update, toggle, remove };
