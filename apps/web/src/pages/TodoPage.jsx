import TodoForm from '../components/todos/TodoForm.jsx';
import TodoItem from '../components/todos/TodoItem.jsx';
import { useCreateTodo, useDeleteTodo, useToggleTodo, useTodos, useUpdateTodo } from '../hooks/useTodos';

export default function TodoPage() {
	const { data: todos = [], isLoading, error } = useTodos();
	const create = useCreateTodo();
	const update = useUpdateTodo();
	const toggle = useToggleTodo();
	const remove = useDeleteTodo();

	const doneCount = todos.filter((t) => t.isDone).length;

	return (
		<div className="mx-auto max-w-xl space-y-4 px-4 py-10">
			<header>
				<h1 className="text-2xl font-bold">Todo List New</h1>
				<p className="text-sm text-content-secondary">
					{doneCount} of {todos.length} completed
				</p>
			</header>

			<TodoForm isLoading={create.isPending} onSubmit={(payload, reset) => create.mutate(payload, { onSuccess: reset })} />

			{isLoading && <p className="text-sm text-content-secondary">Loading…</p>}
			{error && <p className="text-sm text-danger">{error.message}</p>}
			{!isLoading && !error && todos.length === 0 && <p className="text-sm text-content-secondary">No todos yet — add one above.</p>}

			<ul className="space-y-2">
				{todos.map((todo) => (
					<TodoItem key={todo.id} todo={todo} onToggle={toggle.mutate} onSave={update.mutate} onDelete={remove.mutate} />
				))}
			</ul>
		</div>
	);
}
