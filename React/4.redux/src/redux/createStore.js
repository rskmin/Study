/**
 * redux 规定，不管项目有多大，只能有一个store
 * @param {Function} reducer 
 */
function createStore(reducer) {
  
  let state;
  const listeners = [];
  
  function getState() {
    return state;
  }
  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  }
  function subscribe(listener) {
    listeners.push(listener);
    return function () { // 取消订阅
      let index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    }
  }
  dispatch({ type: '@REDUX/INIT' });
  return {
    getState,
    dispatch,
    subscribe,
  }
}

export default createStore;