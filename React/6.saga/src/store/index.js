import { createStore, applyMiddleware } from 'redux';
import createSageMiddleware from '../redux-saga';
import rootSaga from './rootSaga';
import reducer from './reducer';
let sageMiddleware = createSageMiddleware();


const store = applyMiddleware(sageMiddleware)(createStore)(reducer);
sageMiddleware.run(rootSaga);
window.store = store;
export default store;