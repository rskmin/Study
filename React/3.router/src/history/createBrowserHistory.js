
function createBrowserHistory() {
  const globalHistory = window.history;
  let listeners = [];
  function go(n) {
    globalHistory.go(n);
  }
  function goBack() {
    go(-1);
  }
  function goForward() {
    go(1);
  }
  function listen(listener) {
    listeners.push(listener);
    return function() {
      listeners = listeners.filter(l => l !== listener);
    }
  }
  function setState(newState) {
    Object.assign(history, newState);
    history.length = globalHistory.length;
    listeners.forEach(listener => listener(history.location));
  }
  /**
   * 
   * @param {string} path 跳转到那个路径里去
   * @param {Obj} state 这个路径的状态对象是什么，只是一个路径描述信息，取决于业务
   */
  function push(pathname, state) {
    const action = 'PUSH'; // 表示发生了什么动作引起了路径变化
    globalHistory.pushState(state, null, pathname);
    const location = { state, pathname };
    setState({ action, location });
  }
  const history = {
    action: 'POP',
    // block:
    // createHref:
    go,
    goBack,
    goForward,
    length: globalHistory.length,
    listen,
    location: {
      pathname: window.location.pathname,
      state: globalHistory.state,
    },
    push,
    // replace,
  }
  return history;
}

export default createBrowserHistory;