// hooks/useTodos.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { todoApi } from '../services/api.service';
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

  return {
    todos,
    error,
    isLoading,
    addTodo: addTodoMutation.mutate,
    updateTodo: updateTodoMutation.mutate,
    deleteTodo: deleteTodoMutation.mutate,
    isProcessing: addTodoMutation.isPending ||
      updateTodoMutation.isPending ||
      deleteTodoMutation.isPending
  };
}