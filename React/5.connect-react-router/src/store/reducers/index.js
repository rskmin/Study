import { combineReducers } from 'redux';
import { connectRouter } from '../../connected-react-router';
import history from '../../history';

function counter(state = { number: 0 }, action) {
  return state;
}

let reducer = combineReducers({
  counter,
  router: connectRouter(history),
});

export default reducer;