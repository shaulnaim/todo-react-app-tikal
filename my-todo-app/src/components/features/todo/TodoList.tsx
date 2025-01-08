// components/features/todo/TodoList.tsx
import { Todo } from '../../../types/todo.type';

interface TodoListProps {
  todos: Todo[];
  onToggle: (todo: Todo) => void;  // Expects a Todo object
  onDelete: (id: number) => void;
}

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return <div className="text-gray-500 text-center py-4">No todos to display</div>;
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li key={todo.id} className="flex items-center justify-between p-2 border rounded">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo)}
              className="h-4 w-4"
            />
            <span className={todo.completed ? 'line-through text-gray-500' : ''}>{todo.title}</span>
          </div>
          <button
            onClick={() => onDelete(todo.id)}
            className="px-2 py-1 text-red-500 hover:bg-red-100 rounded"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
