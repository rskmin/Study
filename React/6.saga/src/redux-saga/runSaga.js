import * as effectTypes from './effectTypes';

export default function runSaga(env, saga) {
  let { channel, dispatch } = env;
  let it = typeof saga === 'function' ? saga() : saga;
  function next(value) {
    let { value: effect, done } = it.next(value);
    if (!done) {
      if (typeof effect[Symbol.iterator] === 'function') {
        runSaga(env, effect);
        next();
      } else if (typeof effect.then === 'function') {
        effect.then(next);
      } else {
        switch (effect.type) {
          case effectTypes.TAKE:
            channel.take(effect.actionType, next);
            break;
          case effectTypes.PUT:
            dispatch(effect.action);
            next();
            break;
          case effectTypes.FORK:
            runSaga(env, effect.saga);
            next();
            break;
          default:
            break;
        }
      }
    }
  }
  next();
}