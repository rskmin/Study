import { createStore, applyMiddleware } from '../redux';
import combinedReducer from './reducers';


function logger({ getState, dispatch }) {
  return function (next) {
    return function (action) {
      console.log('prev state 1', getState());
      next(action);
      console.log('next state 1', getState());
    }
  }
}

function promise({ getState, dispatch }) {
  return function (next) {
    return function (action) {
      if (typeof action.then === 'function') {
        action.then((action) => {
          dispatch(action);
        })
      } else {
        next(action);
      }
    }
  }
}

function thunk({ getState, dispatch }) {
  return function (next) {
    return function (action) {
      if (typeof action === 'function') {
        action(getState, dispatch);
      } else {
        next(action);
      }
    }
  }
}

let store = applyMiddleware(promise, thunk, logger)(createStore)(combinedReducer);

// let store = createStore(combinedReducer);

// let oldDispatch = store.dispatch;
// store.dispatch = function (action) {
//   console.log('prev state', store.getState());
//   oldDispatch(action);
//   console.log('next state', store.getState());
// }

export default store;