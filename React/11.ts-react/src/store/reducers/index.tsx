import counter, { ICounterState } from './counter';
import todos, { ITodosState } from './todos';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from '@/history';

const reducers = {
  counter,
  todos,
  router: connectRouter(history),
};

type IReducersType = typeof reducers;


const combinedReducer = combineReducers(reducers);
// 合并后的状态类型
type ICombinedState = ReturnType<typeof combinedReducer>
export { ICombinedState, ICounterState, ITodosState };

export default combinedReducer;