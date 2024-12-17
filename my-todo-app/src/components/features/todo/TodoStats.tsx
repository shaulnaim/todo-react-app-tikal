// components/features/todo/TodoStats.tsx
import { Todo } from '../../../types/todo.type';

interface TodoStatsProps {
  todos: Todo[];
}

export function TodoStats({ todos }: TodoStatsProps) {
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="mt-4 text-sm text-gray-600">
      Total todos: {todos.length} | Completed: {completedCount}
    </div>
  );
}
