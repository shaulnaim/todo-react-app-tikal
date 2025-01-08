export interface Todo {
  id: number;
  title: string;  // instead of text
  completed: boolean;
  userId?: number;
}

export type TodoFilter = 'all' | 'active' | 'completed';
