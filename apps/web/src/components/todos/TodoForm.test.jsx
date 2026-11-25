import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import TodoForm from './TodoForm.jsx';

const addButton = () => screen.getByRole('button', { name: /add todo/i });
const titleInput = () => screen.getByPlaceholderText(/what needs to be done/i);
const descInput = () => screen.getByPlaceholderText(/description/i);

describe('TodoForm validation', () => {
	test('Add button is disabled when the title is empty', () => {
		render(<TodoForm onSubmit={vi.fn()} />);
		expect(addButton()).toBeDisabled();
	});

	test('Add button stays disabled for a whitespace-only title', async () => {
		render(<TodoForm onSubmit={vi.fn()} />);
		await userEvent.type(titleInput(), '    ');
		expect(addButton()).toBeDisabled();
	});

	test('Add button enables once a real title is typed', async () => {
		render(<TodoForm onSubmit={vi.fn()} />);
		await userEvent.type(titleInput(), 'Buy milk');
		expect(addButton()).toBeEnabled();
	});

	test('does not submit when the title is blank (Enter key)', async () => {
		const onSubmit = vi.fn();
		render(<TodoForm onSubmit={onSubmit} />);
		await userEvent.type(titleInput(), '   {enter}');
		expect(onSubmit).not.toHaveBeenCalled();
	});

	test('submits title and description, then clears the fields', async () => {
		const onSubmit = vi.fn((payload, reset) => reset());
		render(<TodoForm onSubmit={onSubmit} />);
		await userEvent.type(titleInput(), 'Buy milk');
		await userEvent.type(descInput(), '2 litres');
		await userEvent.click(addButton());

		expect(onSubmit).toHaveBeenCalledTimes(1);
		expect(onSubmit.mock.calls[0][0]).toEqual({ title: 'Buy milk', description: '2 litres' });
		expect(titleInput()).toHaveValue('');
		expect(descInput()).toHaveValue('');
	});

	test('enforces max lengths on the inputs (200 / 500)', () => {
		render(<TodoForm onSubmit={vi.fn()} />);
		expect(titleInput()).toHaveAttribute('maxLength', '200');
		expect(descInput()).toHaveAttribute('maxLength', '500');
	});

	test('disables the button while a request is loading', async () => {
		render(<TodoForm onSubmit={vi.fn()} isLoading />);
		await userEvent.type(titleInput(), 'Buy milk');
		expect(addButton()).toBeDisabled();
	});
});
