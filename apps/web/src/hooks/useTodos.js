import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { todosApi } from '../api/todosApi';

const KEY = ['todos'];

export function useTodos() {
	return useQuery({ queryKey: KEY, queryFn: todosApi.list });
}

function useTodoMutation(fn, successMessage) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: fn,
		onSuccess: () => {
			if (successMessage) toast.success(successMessage);
			queryClient.invalidateQueries({ queryKey: KEY });
		},
		onError: (err) => toast.error(err.message),
	});
}

export const useCreateTodo = () => useTodoMutation(todosApi.create, 'Todo added');
export const useUpdateTodo = () => useTodoMutation(({ id, ...payload }) => todosApi.update(id, payload), 'Todo updated');
export const useToggleTodo = () => useTodoMutation(todosApi.toggle);
export const useDeleteTodo = () => useTodoMutation(todosApi.remove, 'Todo deleted');
