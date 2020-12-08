import { CALL_HISTORY_METHOD } from './push';

function routerMiddleware(history) {
  return function ({ getState, dispatch }) {
    return function (next) {
      return function (action) {
        if (action.type === CALL_HISTORY_METHOD) {
          history.push(action.payload);
        } else {
          next(action);
        }
      }
    }
  }
}

export default routerMiddleware;