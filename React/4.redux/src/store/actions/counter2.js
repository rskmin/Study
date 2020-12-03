import * as actionTypes from '../action-types';

let actions = {
  add() {
    return { type: actionTypes.ADD2 };
  },
  minus() {
    return { type: actionTypes.MINUS2 };
  },
}

export default actions;