// components/features/todo/TodoContainer.tsx
import { useState, useMemo } from 'react';
import { TodoInput } from './TodoInput';
import { TodoFilters } from './TodoFilters';
import { TodoList } from './TodoList';
import { TodoStats } from './TodoStats';
import { useTodoStorage } from '../../../hooks/useTodoStorage';
import { Todo } from '../../../types/todo.type';

export function TodoContainer() {
  // Use our custom hook for localStorage persistence
  const [todos, setTodos] = useTodoStorage();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Handle adding new todos
  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  // Handle toggling todo completion status
  const handleToggle = (id: number) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  // Handle deleting todos
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Calculate filtered todos based on current filter
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  return (
    <div className="max-w-md mx-auto mt-8 p-4">
      <TodoInput onAdd={handleAddTodo} />
      <TodoFilters filter={filter} onFilterChange={setFilter} />
      <TodoList todos={filteredTodos} onToggle={handleToggle} onDelete={handleDelete} />
      <TodoStats todos={todos} />
    </div>
  );
}
