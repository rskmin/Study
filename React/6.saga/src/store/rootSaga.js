import { takeEvery, put } from '../redux-saga/effects';
import * as actionTypes from './action-types';

function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  })
}

function* add() {
  yield delay(1000);
  yield put({ type: actionTypes.ADD });
}

function* rootSaga() {
  // yield watcherAddSaga();
  yield takeEvery(actionTypes.ASYNC_ADD, add);
}

export default rootSaga;
