import { Todo } from "../../types/todo.type";

// services/api.service.ts
const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const todoApi = {
  getTodos: async (): Promise<Todo[]> => {
    const response = await fetch(`${BASE_URL}/todos`);
    if (!response.ok) throw new Error('Failed to fetch todos');
    return response.json();
  },

  addTodo: async (todo: Omit<Todo, 'id'>): Promise<Todo> => {
    const response = await fetch(`${BASE_URL}/todos`, {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (!response.ok) throw new Error('Failed to add todo');
    return response.json();
  },

  updateTodo: async (todo: Todo): Promise<Todo> => {
    const response = await fetch(`${BASE_URL}/todos/${todo.id}`, {
      method: 'PUT',
      body: JSON.stringify(todo),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (!response.ok) throw new Error('Failed to update todo');
    return response.json();
  },

  deleteTodo: async (id: number): Promise<void> => {
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete todo');
  }
};