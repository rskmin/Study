import { ADD_TODO } from '@/action-types';
import { ITodo } from '@/models';

export function addTodo(todo: ITodo) {
  return { type: ADD_TODO, payload: todo };
}

export type ITodosAction = ReturnType<typeof addTodo>;