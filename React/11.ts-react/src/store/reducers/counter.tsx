import { ADD, MINUS } from '@/action-types';
import { ICounterAction } from '@/store/actions/counter';

export interface ICounterState {
  count: number;
}

const initialState: ICounterState = { count: 0 };


export default function (state = initialState, action: ICounterAction): ICounterState {
  switch (action.type) {
    case ADD:
      return { ...state, count: state.count + 1 };
    case MINUS:
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}