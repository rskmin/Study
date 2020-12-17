import runSaga from './runSaga';
import stdChannel from './channel';

function createSagaMiddleware() {
  let channel = stdChannel();
  let boundRunSaga;
  function sagaMiddleware({ getState, dispatch }) {
    boundRunSaga = runSaga.bind(null, {channel, getState, dispatch})
    return function next(next) {
      return function action(action) {
        const result = next(action);
        channel.put(action);
        return result;
      }
    }
  }
  sagaMiddleware.run = (...args) => boundRunSaga(...args);
  return sagaMiddleware;
}

export default createSagaMiddleware;