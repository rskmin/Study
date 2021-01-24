import { createStore, applyMiddleware } from 'redux';
import combinedReducer from './reducers';
import { routerMiddleware } from 'connected-react-router';
import history from '@/history';
import thunk from 'redux-thunk';

const store = applyMiddleware(thunk, routerMiddleware(history))(createStore)(combinedReducer);

export default store;