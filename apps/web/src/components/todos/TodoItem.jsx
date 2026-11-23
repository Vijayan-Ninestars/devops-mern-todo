import { useState } from 'react';
import { Check, Pencil, Trash2, X } from 'lucide-react';

export default function TodoItem({ todo, onToggle, onSave, onDelete }) {
	const [editing, setEditing] = useState(false);
	const [title, setTitle] = useState(todo.title);
	const [description, setDescription] = useState(todo.description ?? '');

	function save() {
		if (!title.trim()) return;
		onSave({ id: todo.id, title, description, isDone: todo.isDone });
		setEditing(false);
	}

	if (editing) {
		return (
			<li className="flex flex-col gap-2 rounded-lg border border-primary bg-surface-card p-3">
				<input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="rounded border border-border px-2 py-1 text-sm outline-none focus:border-primary"
				/>
				<input
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder="Description"
					className="rounded border border-border px-2 py-1 text-sm outline-none focus:border-primary"
				/>
				<div className="flex justify-end gap-2">
					<button onClick={save} className="rounded p-1 text-success hover:bg-green-50" aria-label="Save">
						<Check size={18} />
					</button>
					<button onClick={() => setEditing(false)} className="rounded p-1 text-content-secondary hover:bg-gray-100" aria-label="Cancel">
						<X size={18} />
					</button>
				</div>
			</li>
		);
	}

	return (
		<li className="flex items-start gap-3 rounded-lg border border-border bg-surface-card p-3 shadow-card">
			<input type="checkbox" checked={todo.isDone} onChange={() => onToggle(todo.id)} className="mt-1 h-4 w-4 accent-primary" />
			<div className="min-w-0 flex-1">
				<p className={`text-sm font-medium ${todo.isDone ? 'text-content-secondary line-through' : ''}`}>{todo.title}</p>
				{todo.description && <p className="text-xs text-content-secondary">{todo.description}</p>}
			</div>
			<button onClick={() => setEditing(true)} className="rounded p-1 text-content-secondary hover:bg-primary-light hover:text-primary" aria-label="Edit">
				<Pencil size={16} />
			</button>
			<button onClick={() => onDelete(todo.id)} className="rounded p-1 text-content-secondary hover:bg-red-50 hover:text-danger" aria-label="Delete">
				<Trash2 size={16} />
			</button>
		</li>
	);
}
