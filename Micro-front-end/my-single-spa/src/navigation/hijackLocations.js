import { invoke } from './invoke.js';

const HIJACK_EVENTS_NAME = /^(hashchange|popstate)$/i;
const EVENTS_POOL = {
  hashchange: [],
  popstate: [],
};
function reroute() {
  invoke([], arguments);
}
window.addEventListener('hashchange', reroute);
window.addEventListener('popstate', reroute);

const originalAddEventListener = window.addEventListener;
const originalRemoveEventListener = window.removeEventListener;

window.addEventListener = function (eventName, handler) {
  if (eventName && HIJACK_EVENTS_NAME.test(eventName)) {
    EVENTS_POOL[eventName].indexOf(handler) === -1 &&
      EVENTS_POOL[eventName].push(handler);
  } else {
    originalAddEventListener.apply(this, arguments);
  }
};

window.removeEventListener = function (eventName, handler) {
  if (eventName && HIJACK_EVENTS_NAME.test(eventName)) {
    let events = EVENTS_POOL[eventName];
    events.indexOf(handler) > -1 &&
      (EVENTS_POOL[eventName] = events.filter(fn => fn !== handler));
  } else {
    originalRemoveEventListener.apply(this, arguments);
  }
};

function mockPopStateEvent(state) {
  return new PopStateEvent('popstate', {state});
}

const originalPushState = window.history.pushState;
const originalReplaceState = window.history.replaceState;
window.history.pushState = function (state, title, url) {
  let result = originalPushState.apply(this, arguments);
  reroute(mockPopStateEvent(state));
  return result;
};

window.history.replaceState = function (state, title, url) {
  let result = originalReplaceState.apply(this, arguments);
  reroute(mockPopStateEvent(state));
  return result;
};

export function callCapturedEvents(eventsArgs) {
  if (!eventsArgs) {
    return;
  }
  if (!Array.isArray(eventsArgs)) {
    eventsArgs = [eventsArgs];
  }
  let name = eventsArgs[0].type;
  if (!EVENTS_POOL[name] || EVENTS_POOL[name].length === 0) {
    return;
  }
  EVENTS_POOL[name].forEach(handler => {
    handler.apply(null, eventsArgs);
  });
}