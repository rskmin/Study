import React from 'react'
import ReactDOM from 'react-dom'
import prefixNamespace from './prefixNamespace';
import { Provider, connect } from 'react-redux'
import { createStore, combineReducers } from 'redux';
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
  let initialReducers = {};
  function start(root) {
    for (const model of app._models) {
      initialReducers[model.namespace] = getReducer(model);
    }
    let rootReducer = createRootReducer(initialReducers);
    let store = createStore(rootReducer);
    ReactDOM.render(
      <Provider store={store}>
        {app._router()}
      </Provider>, document.querySelector(root)
    );
  }
  
  function createRootReducer(initialReducers) {
    return combineReducers(initialReducers);
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