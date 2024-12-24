// hooks/useTodoStorage.tsx
import { useState, useEffect } from 'react';
import { Todo } from '../types/todo.type.ts';

export function useTodoStorage() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return [todos, setTodos] as const;
}
