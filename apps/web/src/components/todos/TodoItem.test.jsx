import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import TodoItem from './TodoItem.jsx';

const todo = { id: 7, title: 'Write tests', description: 'with vitest', isDone: false };

function setup(overrides = {}) {
	const handlers = { onToggle: vi.fn(), onSave: vi.fn(), onDelete: vi.fn() };
	render(<TodoItem todo={{ ...todo, ...overrides }} {...handlers} />);
	return handlers;
}

describe('TodoItem', () => {
	test('shows title and description', () => {
		setup();
		expect(screen.getByText('Write tests')).toBeInTheDocument();
		expect(screen.getByText('with vitest')).toBeInTheDocument();
	});

	test('strikes through a completed todo', () => {
		setup({ isDone: true });
		expect(screen.getByText('Write tests')).toHaveClass('line-through');
	});

	test('toggle and delete call the handlers with the id', async () => {
		const { onToggle, onDelete } = setup();
		await userEvent.click(screen.getByRole('checkbox'));
		await userEvent.click(screen.getByRole('button', { name: /delete/i }));
		expect(onToggle).toHaveBeenCalledWith(7);
		expect(onDelete).toHaveBeenCalledWith(7);
	});

	test('edit: an empty title is NOT saved and the editor stays open', async () => {
		const { onSave } = setup();
		await userEvent.click(screen.getByRole('button', { name: /edit/i }));
		await userEvent.clear(screen.getByDisplayValue('Write tests'));
		await userEvent.click(screen.getByRole('button', { name: /save/i }));
		expect(onSave).not.toHaveBeenCalled();
		expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
	});

	test('edit: a valid change is saved', async () => {
		const { onSave } = setup();
		await userEvent.click(screen.getByRole('button', { name: /edit/i }));
		const input = screen.getByDisplayValue('Write tests');
		await userEvent.clear(input);
		await userEvent.type(input, 'Renamed');
		await userEvent.click(screen.getByRole('button', { name: /save/i }));
		expect(onSave).toHaveBeenCalledWith({ id: 7, title: 'Renamed', description: 'with vitest', isDone: false });
	});

	test('edit: cancel discards the editor without saving', async () => {
		const { onSave } = setup();
		await userEvent.click(screen.getByRole('button', { name: /edit/i }));
		await userEvent.click(screen.getByRole('button', { name: /cancel/i }));
		expect(onSave).not.toHaveBeenCalled();
		expect(screen.getByText('Write tests')).toBeInTheDocument();
	});
});
