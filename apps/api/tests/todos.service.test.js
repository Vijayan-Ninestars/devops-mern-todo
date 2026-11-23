jest.mock('../src/modules/todos/todos.repository');

const repository = require('../src/modules/todos/todos.repository');
const service = require('../src/modules/todos/todos.service');

const todo = { id: 1, title: 'Write tests', description: null, isDone: false };

describe('todos.service', () => {
	test('list returns all todos', async () => {
		repository.findAll.mockResolvedValue([todo]);
		await expect(service.list()).resolves.toEqual([todo]);
	});

	test('getById throws 404 when missing', async () => {
		repository.findById.mockResolvedValue(null);
		await expect(service.getById(99)).rejects.toMatchObject({ statusCode: 404 });
	});

	test('update checks existence before updating', async () => {
		repository.findById.mockResolvedValue(todo);
		repository.update.mockResolvedValue({ ...todo, title: 'New' });
		const result = await service.update(1, { title: 'New', description: null, isDone: false });
		expect(result.title).toBe('New');
		expect(repository.update).toHaveBeenCalledWith(1, { title: 'New', description: null, isDone: false });
	});

	test('remove does not delete a missing todo', async () => {
		repository.findById.mockResolvedValue(null);
		await expect(service.remove(5)).rejects.toMatchObject({ statusCode: 404 });
		expect(repository.remove).not.toHaveBeenCalled();
	});
});
