jest.mock('../src/modules/todos/todos.repository');

const request = require('supertest');
const repository = require('../src/modules/todos/todos.repository');
const app = require('../src/app');

const todo = { id: 1, title: 'Write tests', description: null, isDone: false };

describe('GET /health', () => {
	test('returns ok', async () => {
		const res = await request(app).get('/health');
		expect(res.status).toBe(200);
		expect(res.body.status).toBe('ok');
	});
});

describe('/api/todos', () => {
	test('GET lists todos', async () => {
		repository.findAll.mockResolvedValue([todo]);
		const res = await request(app).get('/api/todos');
		expect(res.status).toBe(200);
		expect(res.body).toMatchObject({ success: true, data: [todo] });
	});

	test('POST creates a todo', async () => {
		repository.create.mockResolvedValue(todo);
		const res = await request(app).post('/api/todos').send({ title: '  Write tests  ' });
		expect(res.status).toBe(201);
		expect(repository.create).toHaveBeenCalledWith({ title: 'Write tests', description: null });
		expect(res.body.data).toEqual(todo);
	});

	test('POST rejects an empty title', async () => {
		const res = await request(app).post('/api/todos').send({ title: '   ' });
		expect(res.status).toBe(400);
		expect(res.body.success).toBe(false);
		expect(res.body.details.title).toEqual(['Title is required']);
		expect(repository.create).not.toHaveBeenCalled();
	});

	test('PUT updates a todo', async () => {
		repository.findById.mockResolvedValue(todo);
		repository.update.mockResolvedValue({ ...todo, title: 'Edited', isDone: true });
		const res = await request(app).put('/api/todos/1').send({ title: 'Edited', isDone: true });
		expect(res.status).toBe(200);
		expect(res.body.data).toMatchObject({ title: 'Edited', isDone: true });
	});

	test('PUT returns 404 for an unknown id', async () => {
		repository.findById.mockResolvedValue(null);
		const res = await request(app).put('/api/todos/42').send({ title: 'x' });
		expect(res.status).toBe(404);
	});

	test('PATCH toggles a todo', async () => {
		repository.findById.mockResolvedValue(todo);
		repository.toggle.mockResolvedValue({ ...todo, isDone: true });
		const res = await request(app).patch('/api/todos/1/toggle');
		expect(res.status).toBe(200);
		expect(res.body.data.isDone).toBe(true);
	});

	test('DELETE removes a todo', async () => {
		repository.findById.mockResolvedValue(todo);
		repository.remove.mockResolvedValue();
		const res = await request(app).delete('/api/todos/1');
		expect(res.status).toBe(200);
		expect(repository.remove).toHaveBeenCalledWith(1);
	});

	test('rejects a non-numeric id', async () => {
		const res = await request(app).delete('/api/todos/abc');
		expect(res.status).toBe(400);
	});
});
