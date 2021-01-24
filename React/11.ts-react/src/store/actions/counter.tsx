import { ADD, MINUS } from '@/action-types';
import { LocationDescriptorObject } from 'history';
import { ILocationState } from '@/components/Todos';
import { push } from 'connected-react-router';

export function add() {
  return { type: ADD };
}

export function asyncAdd() {
  return function (dispatch: any, getState: any) {
    setTimeout(() => {
      dispatch({ type: ADD });
    }, 1000);
  };
}

export function minus() {
  return { type: MINUS };
}

export function go(location: LocationDescriptorObject<ILocationState>) {
  return push<ILocationState>(location);
}

export type ICounterAction = ReturnType<typeof add> | ReturnType<typeof minus>;
