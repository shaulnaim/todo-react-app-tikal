// hooks/useTodos.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { todoApi } from '../assets/services/api.service';
import { Todo } from '../types/todo.type';

export function useTodos() {
  const queryClient = useQueryClient();

  const { data: todos = [], error, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: todoApi.getTodos
  });

  const addTodoMutation = useMutation({
    mutationFn: (newTodo: Omit<Todo, 'id'>) => todoApi.addTodo(newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  });

  const updateTodoMutation = useMutation({
    mutationFn: (todo: Todo) => todoApi.updateTodo(todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  });

  const deleteTodoMutation = useMutation({
    mutationFn: (id: number) => todoApi.deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  });

  const toggleTodoMutation = useMutation({
    mutationFn: (todo: Todo) => todoApi.updateTodo(todo),
    onMutate: async (updatedTodo) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData(['todos']);

      // Optimistically update to the new value
      queryClient.setQueryData(['todos'], (old: Todo[] = []) => {
        return old.map(todo =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        );
      });

      // Return context with the previous value
      return { previousTodos };
    },
    onError: (err, newTodo, context) => {
      // If the mutation fails, roll back to the previous value
      queryClient.setQueryData(['todos'], context?.previousTodos);
    },
    onSettled: () => {
      // Refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  });

  return {
    todos,
    error,
    isLoading,
    addTodo: addTodoMutation.mutate,
    updateTodo: updateTodoMutation.mutate,
    deleteTodo: deleteTodoMutation.mutate,
    toggleTodo: (todo: Todo) => toggleTodoMutation.mutate(todo),
    isProcessing: addTodoMutation.isPending ||
      updateTodoMutation.isPending ||
      deleteTodoMutation.isPending
  };
}