import { ADD_TODO } from '@/action-types';
import { ITodo } from '@/models';
import { ITodosAction } from '@/store/actions/todos';

export interface ITodosState {
  list: ITodo[];
}

const initialState: ITodosState = { list: [] };


export default function (state = initialState, action: ITodosAction): ITodosState {
  switch (action.type) {
    case ADD_TODO:
      return { ...state, list: [...state.list, action.payload] };
    default:
      return state;
  }
}