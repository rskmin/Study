
function createHashHistory() {
  const globalHistory = window.history;
  let stack = [];
  let listeners = [];
  let index = -1;
  let action;
  let state;
  function go(n) {
    action = 'POP';
    index += n;
    let nextLocation = stack[index];
    state = nextLocation.state;
    window.location.hash = nextLocation.pathname;
  }
  function goBack() {
    go(-1);
  }
  function goForward() {
    go(1);
  }
  function listen(listener) {
    listeners.push(listener);
    return function () {
      listeners = listeners.filter(l => l !== listener);
    }
  }
  window.addEventListener('hashchange', () => {
    let pathname = window.location.hash?.slice(1) || '/';
    Object.assign(history, { action, location: { pathname, state } });
    if (action === 'PUSH') {
      stack[++index] = history.location;
    }
    listeners.forEach(listener => listener(history.location));
  })
  function push(pathname, nextState) {
    action = 'PUSH';
    if (typeof pathname === 'object') {
      state = pathname.state;
      pathname = pathname.pathname;
    } else {
      state = nextState;
    }
    window.location.hash = pathname;
  }
  const history = {
    action: 'POP',
    go,
    goBack,
    goForward,
    length: globalHistory.length,
    listen,
    location: {
      pathname: window.location.hash?.slice(1) || '/',
      state: globalHistory.state,
    },
    push,
  }
  window.location.hash = window.location.hash?.slice(1) || '/';
  window._history = history;
  return history;
}

export default createHashHistory;