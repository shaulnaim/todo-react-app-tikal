import { useState, useMemo } from 'react';
import { TodoInput } from './TodoInput';
import { TodoFilters } from './TodoFilters';
import { TodoList } from './TodoList';
import { TodoStats } from './TodoStats';
import { useTodos } from '../../../hooks/useTodos';

export function TodoContainer() {
  // Move all hooks to the top level
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const {
    todos,
    error,
    isLoading,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    isProcessing
  } = useTodos();

  // Use memo after all hooks
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const handleAddTodo = (text: string) => {
    addTodo({
      title: text,  // changed from text to title
      completed: false,
      userId: 1  // JSONPlaceholder requires a userId
    });
  };

  // Render loading and error states without conditional hooks
  if (isLoading) {
    return <div className="max-w-md mx-auto mt-8 p-4">Loading todos...</div>;
  }

  if (error) {
    return <div className="max-w-md mx-auto mt-8 p-4">Error loading todos: {error.message}</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-4">
      {isProcessing && <div>Processing...</div>}
      <TodoInput onAdd={handleAddTodo} />
      <TodoFilters filter={filter} onFilterChange={setFilter} />
      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}  // Make sure you're passing updateTodo here
        onDelete={deleteTodo}
      />
      <TodoStats todos={todos} />
    </div>
  );
}