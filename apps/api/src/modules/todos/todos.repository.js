const pool = require('../../config/database');

const SELECT = `
	SELECT td_id AS "id", td_title AS "title", td_description AS "description",
	       td_is_done AS "isDone", td_created_at AS "createdAt", td_updated_at AS "updatedAt"
	FROM todos`;

async function findAll() {
	const { rows } = await pool.query(`${SELECT} ORDER BY td_is_done, td_created_at DESC`);
	return rows;
}

async function findById(id) {
	const { rows } = await pool.query(`${SELECT} WHERE td_id = $1`, [id]);
	return rows[0] ?? null;
}

async function create({ title, description }) {
	const { rows } = await pool.query(`INSERT INTO todos (td_title, td_description) VALUES ($1, $2) RETURNING td_id AS "id"`, [
		title,
		description ?? null,
	]);
	return findById(rows[0].id);
}

async function update(id, { title, description, isDone }) {
	await pool.query(`UPDATE todos SET td_title = $2, td_description = $3, td_is_done = $4, td_updated_at = NOW() WHERE td_id = $1`, [
		id,
		title,
		description ?? null,
		isDone ?? false,
	]);
	return findById(id);
}

async function toggle(id) {
	await pool.query(`UPDATE todos SET td_is_done = NOT td_is_done, td_updated_at = NOW() WHERE td_id = $1`, [id]);
	return findById(id);
}

async function remove(id) {
	await pool.query(`DELETE FROM todos WHERE td_id = $1`, [id]);
}

module.exports = { findAll, findById, create, update, toggle, remove };
