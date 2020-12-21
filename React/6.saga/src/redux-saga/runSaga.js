import * as effectTypes from './effectTypes';

export default function runSaga(env, saga, finish) {
  let task = { cancel: () => next('TASK_CANCEL') };
  let { channel, dispatch } = env;
  let it = typeof saga === 'function' ? saga() : saga;
  function next(value, isErr) {
    let result;
    if (isErr) { // 如果出错，让当前的saga终止, 并且抛出错误
      result = it.throw(value);
    } else if (value === 'TASK_CANCEL') {
      result = it.return(value);
    } else {
      result = it.next(value);
    }
    let { value: effect, done } = result;
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
            let forkedTask = runSaga(env, effect.saga);
            next(forkedTask);
            break;
          case effectTypes.CALL:
            effect.fn(...effect.args).then(next);
            break;
          case effectTypes.CPS:
            effect.fn(...effect.args, (err, data) => {
              if (err) {
                next(err, true);
              } else {
                next(data);
              }
            });
            break;
          case effectTypes.ALL:
            let { effects } = effect;
            let completeCount = 0;
            let result = []; // 存放最终返回值
            effects.forEach((effect, index) => runSaga(env, effect, (value) => {
              result[index] = value;
              if (++completeCount === effects.length) {
                next(result);
              }
            }));
            break;
          case effectTypes.CANCEL:
            effect.task.cancel();
            next();
            break;
          default:
            break;
        }
      }
    } else {
      finish && finish(result.value);
    }
  }
  next();
  return task;
}