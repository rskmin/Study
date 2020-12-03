import * as actionTypes from '../action-types';

let actions = {
  add() {
    return { type: actionTypes.ADD1 };
  },
  promiseAdd() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ type: actionTypes.ADD1 })
      }, 1000);
    });
  },
  thunkAdd() {
    return function (getState, dispatch) {
      setTimeout(() => {
        dispatch({ type: actionTypes.ADD1 })
      }, 1000);
    };
  },
  minus() {
    return { type: actionTypes.MINUS1 };
  },
}

export default actions;