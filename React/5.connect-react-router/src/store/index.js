import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import { routerMiddleware } from '../connected-react-router';
import history from '../history';

const store = applyMiddleware(routerMiddleware(history))(createStore)(reducer);
window.store = store;
export default store;