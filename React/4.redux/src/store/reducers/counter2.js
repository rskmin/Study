import * as actionTypes from '../action-types';

function reducer(state = { number: 0 }, action) {
  switch (action.type) {
    case actionTypes.ADD2:
      return { number: state.number + 2 };
    case actionTypes.MINUS2:
      return { number: state.number - 2 };
    default:
      return state;
  }
}

export default reducer;