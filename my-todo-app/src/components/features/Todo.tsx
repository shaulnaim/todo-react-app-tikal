import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [inputText, setInputText] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [displayedTodos, setDisplayedTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const filterTodos = () => {
      switch (filter) {
        case 'active':
          setDisplayedTodos(todos.filter((todo) => !todo.completed));
          break;
        case 'completed':
          setDisplayedTodos(todos.filter((todo) => todo.completed));
          break;
        default:
          setDisplayedTodos(todos);
      }
    };

    filterTodos();
  }, [todos, filter]);

  const handleAddTodo = () => {
    if (inputText.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputText.trim(),
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputText('');
    }
  };

  const handleToggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4">
      {/* Input section - keep as is */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && handleAddTodo()}
          placeholder="Add a new todo"
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={handleAddTodo}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {/* New filter buttons section */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded transition-colors
                    ${
                      filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                    }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-3 py-1 rounded transition-colors
                    ${
                      filter === 'active'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-3 py-1 rounded transition-colors
                    ${
                      filter === 'completed'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
        >
          Completed
        </button>
      </div>

      {/* Todo list - now using displayedTodos instead of todos */}
      <ul className="space-y-2">
        {displayedTodos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between p-2 border rounded">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
                className="h-4 w-4"
              />
              <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                {todo.text}
              </span>
            </div>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="px-2 py-1 text-red-500 hover:bg-red-100 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Enhanced stats section */}
      {todos.length > 0 && (
        <div className="mt-4 text-sm text-gray-600">
          Showing {displayedTodos.length} of {todos.length} todos | Completed:{' '}
          {todos.filter((t) => t.completed).length}
        </div>
      )}
    </div>
  );
}
