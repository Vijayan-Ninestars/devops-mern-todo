import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('../hooks/useTodos', () => ({
	useTodos: vi.fn(),
	useCreateTodo: () => ({ mutate: vi.fn(), isPending: false }),
	useUpdateTodo: () => ({ mutate: vi.fn() }),
	useToggleTodo: () => ({ mutate: vi.fn() }),
	useDeleteTodo: () => ({ mutate: vi.fn() }),
}));

import { useTodos } from '../hooks/useTodos';
import TodoPage from './TodoPage.jsx';

const todos = [
	{ id: 1, title: 'One', description: null, isDone: true },
	{ id: 2, title: 'Two', description: null, isDone: false },
	{ id: 3, title: 'Three', description: null, isDone: true },
];

describe('TodoPage', () => {
	test('shows the completed count, e.g. "2 of 3 completed"', () => {
		useTodos.mockReturnValue({ data: todos, isLoading: false, error: null });
		render(<TodoPage />);
		expect(screen.getByText('2 of 3 completed')).toBeInTheDocument();
	});

	test('shows "0 of 0 completed" for an empty list', () => {
		useTodos.mockReturnValue({ data: [], isLoading: false, error: null });
		render(<TodoPage />);
		expect(screen.getByText('0 of 0 completed')).toBeInTheDocument();
		expect(screen.getByText(/no todos yet/i)).toBeInTheDocument();
	});

	test('renders every todo', () => {
		useTodos.mockReturnValue({ data: todos, isLoading: false, error: null });
		render(<TodoPage />);
		['One', 'Two', 'Three'].forEach((t) => expect(screen.getByText(t)).toBeInTheDocument());
	});

	test('shows the loading state', () => {
		useTodos.mockReturnValue({ data: undefined, isLoading: true, error: null });
		render(<TodoPage />);
		expect(screen.getByText(/loading/i)).toBeInTheDocument();
	});

	test('shows the error message when loading fails', () => {
		useTodos.mockReturnValue({ data: undefined, isLoading: false, error: new Error('Network down') });
		render(<TodoPage />);
		expect(screen.getByText('Network down')).toBeInTheDocument();
	});
});
