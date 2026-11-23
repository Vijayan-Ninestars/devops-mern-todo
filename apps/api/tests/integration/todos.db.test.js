/**
 * Integration tests: real Express app + real PostgreSQL (no mocks).
 * Skipped unless RUN_DB_TESTS=true so `npm test` stays DB-free locally.
 * Cleans up only the rows it creates.
 */
const request = require('supertest');

const describeDb = process.env.RUN_DB_TESTS === 'true' ? describe : describe.skip;

describeDb('todos API (real database)', () => {
	let app;
	let pool;
	const createdIds = [];

	beforeAll(() => {
		app = require('../../src/app');
		pool = require('../../src/config/database');
	});

	afterAll(async () => {
		if (createdIds.length) await pool.query('DELETE FROM todos WHERE td_id = ANY($1::int[])', [createdIds]);
		await pool.end();
	});

	test('full lifecycle: create -> list -> update -> toggle -> delete', async () => {
		const created = await request(app).post('/api/todos').send({ title: 'integration todo', description: 'from jest' });
		expect(created.status).toBe(201);
		const { id } = created.body.data;
		createdIds.push(id);
		expect(created.body.data).toMatchObject({ title: 'integration todo', description: 'from jest', isDone: false });

		const list = await request(app).get('/api/todos');
		expect(list.status).toBe(200);
		expect(list.body.data.some((t) => t.id === id)).toBe(true);

		const updated = await request(app).put(`/api/todos/${id}`).send({ title: 'renamed', isDone: false });
		expect(updated.status).toBe(200);
		expect(updated.body.data).toMatchObject({ title: 'renamed', description: null });

		const toggled = await request(app).patch(`/api/todos/${id}/toggle`);
		expect(toggled.body.data.isDone).toBe(true);

		const deleted = await request(app).delete(`/api/todos/${id}`);
		expect(deleted.status).toBe(200);

		const gone = await request(app).put(`/api/todos/${id}`).send({ title: 'x' });
		expect(gone.status).toBe(404);
	});

	test('rejects invalid input before hitting the database', async () => {
		const res = await request(app).post('/api/todos').send({ title: '' });
		expect(res.status).toBe(400);
	});
});
