import * as effectTypes from './effectTypes';

export function take(actionType) {
  return { type: effectTypes.TAKE, actionType };
}

export function put(action) {
  return { type: effectTypes.PUT, action };
}

export function fork(saga) {
  return { type: effectTypes.FORK, saga };
}

export function takeEvery(actionType, saga) {
  function* typeEveryHelper() {
    while (true) {
      yield take(actionType);
      yield fork(saga);
    }
  }
  return fork(typeEveryHelper);
}

export function call(fn, ...args) {
  return { type: effectTypes.CALL, fn, args };
}

export function cps(fn, ...args) {
  return { type: effectTypes.CPS, fn, args };
}

export function all(effects) {
  return { type: effectTypes.ALL, effects };
}

export function cancel(task) {
  return { type: effectTypes.CANCEL, task };
}

export function delayP(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  })
}

export const delay = call.bind(null, delayP);