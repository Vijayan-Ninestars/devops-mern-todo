import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function TodoForm({ onSubmit, isLoading }) {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	function handleSubmit(e) {
		e.preventDefault();
		if (!title.trim()) return;
		onSubmit({ title, description }, () => {
			setTitle('');
			setDescription('');
		});
	}

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-2 rounded-lg border border-border bg-surface-card p-4 shadow-card">
			<input
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="What needs to be done?"
				maxLength={200}
				className="rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary"
			/>
			<input
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				placeholder="Description (optional)"
				maxLength={500}
				className="rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary"
			/>
			<button
				type="submit"
				disabled={isLoading || !title.trim()}
				className="flex items-center justify-center gap-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover disabled:opacity-50"
			>
				<Plus size={16} /> Add todo
			</button>
		</form>
	);
}
