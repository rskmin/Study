import React from 'react'
import ReactDOM from 'react-dom'
import prefixNamespace from './prefixNamespace';
import { Provider, connect } from 'react-redux'
import createSagaMiddleware from 'redux-saga';
import * as sagaEffects from 'redux-saga/effects';
import { NAMESPACE_SEP } from './constants';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createHashHistory } from 'history';
import { routerMiddleware, connectRouter } from 'connected-react-router';
let history = createHashHistory();
export {
  connect,
}

function dva() {
  const app = {
    model,
    _models: [],
    router,
    _router: null,
    start,
  };

  function model(model) {
    let prefixModel = prefixNamespace(model); // 处理命名空间
    app._models.push(prefixModel); // 注册模型
    return prefixModel;
  }

  function router(routeConfig) {
    app._router = routeConfig;
  }
  let initialReducers = {
    router: connectRouter(history),
  };
  function start(root) {
    for (const model of app._models) {
      initialReducers[model.namespace] = getReducer(model);
    }
    let rootReducer = createRootReducer(initialReducers);
    const sagaMiddleware = createSagaMiddleware();
    let store = applyMiddleware(routerMiddleware(history), sagaMiddleware)(createStore)(rootReducer);
    const sagas = getSagas(app);
    sagas.forEach(sagaMiddleware.run);
    ReactDOM.render(
      <Provider store={store}>
        {app._router({ history })}
      </Provider>, document.querySelector(root)
    );
  }

  function createRootReducer(initialReducers) {
    return combineReducers(initialReducers);
  }

  function getSagas(app) {
    let sagas = [];
    for (const model of app._models) {
      sagas.push(getSaga(model.effects, model));
    }
    return sagas;
  }

  function getSaga(effects, model) {
    return function* () {
      for (const actionType in effects) {
        const watcherSaga = getWatcher(actionType, model.effects[actionType], model);
        yield sagaEffects.fork(watcherSaga);
      }
    }
  }

  function getWatcher(actionType, saga, model) {
    return function* () {
      yield sagaEffects.takeEvery(actionType, function* (action) {
        yield saga(action, { ...sagaEffects, put: action => sagaEffects.put({ ...action, type: prefixType(action.type, model) })});
      });
    }
  }

  function prefixType(actionType, model) {
    if (actionType.indexOf(NAMESPACE_SEP) === -1) {
      return `${model.namespace}${NAMESPACE_SEP}${actionType}`;
    }
    return actionType;
  }

  function getReducer(model) {
    let { reducers, state: initialState } = model;
    let reducer = (state = initialState, action) => {
      let reducer = reducers[action.type];
      if (reducer) {
        return reducer(state, action);
      }
      return state;
    }
    return reducer;
  }

  return app;
}

export default dva;