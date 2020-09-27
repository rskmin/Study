(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.mySingleSpa = {}));
}(this, (function (exports) { 'use strict';

  const NOT_LOADED = {
    status: 'NOT_LOADED'
  };
  const LOAD_SOURCE_CODE = {
    status: 'LOAD_SOURCE_CODE'
  };
  const NOT_BOOTSTRAPPED = {
    status: 'NOT_BOOTSTRAPPED'
  };
  const BOOTSTRAPPING = {
    status: 'BOOTSTRAPPING'
  };
  const NOT_MOUNTED = {
    status: 'NOT_MOUNTED'
  };
  const MOUNTING = {
    status: 'MOUNTING'
  };
  const MOUNTED = {
    status: 'MOUNTED'
  };
  const UNMOUNTING = {
    status: 'UNMOUNTING'
  };
  const SKIP_BECAUSE_BROKEN = {
    status: 'SKIP_BECAUSE_BROKEN'
  };
  const LOAD_ERROR = {
    status: 'LOAD_ERROR'
  };
  function noSkip(app) {
    return app.status !== SKIP_BECAUSE_BROKEN;
  }
  function noLoadError(app) {
    return app.status !== LOAD_ERROR;
  }
  function isLoaded(app) {
    return app.status !== NOT_LOADED && app.status !== SKIP_BECAUSE_BROKEN && app.status !== LOAD_ERROR;
  }
  function isntLoaded(app) {
    return !isLoaded(app);
  }
  function shouldBeActive(app) {
    try {
      return app.activityWhen(window.location);
    } catch (e) {
      app.status = SKIP_BECAUSE_BROKEN;
      console.log(e);
    }
  }
  function shouldntBeActive(app) {
    try {
      return !app.activityWhen(window.location);
    } catch (e) {
      app.status = SKIP_BECAUSE_BROKEN;
      console.log(e);
    }
  }
  function isActive(app) {
    return app.status === MOUNTED;
  }
  function isntActive(app) {
    return !isActive(app);
  }

  let started = false;
  function start() {
    if (started) {
      return;
    }

    started = true;
    console.log('my-single-spa start');
    return invoke();
  }
  function isStarted() {
    return started;
  }

  const TIMEOUTS = {
    bootstrap: {
      milliseconds: 3000,
      rejectWhenTimeout: false
    },
    mount: {
      milliseconds: 3000,
      rejectWhenTimeout: false
    },
    unmount: {
      milliseconds: 3000,
      rejectWhenTimeout: false
    }
  };
  function reasonableTime(lifecyclePromise, description, timeout) {
    return new Promise((resolve, reject) => {
      let finished = false;
      lifecyclePromise.then(data => {
        finished = true;
        resolve(data);
      }).catch(e => {
        finished = true;
        reject(e);
      });
      setTimeout(() => {
        if (finished) {
          return;
        }

        if (timeout.rejectWhenTimeout) {
          reject(`${description}`);
        } else {
          console.log('timeout but waiting');
        }
      }, timeout.milliseconds);
    });
  }
  function ensureTimeout(timeouts = {}) {
    return { ...TIMEOUTS,
      ...timeouts
    };
  }

  function smellLikePromise(promise) {
    if (promise instanceof Promise) {
      return true;
    }

    return typeof promise === 'object' && typeof promise.then === 'function' && typeof promise.catch === 'function';
  }
  function flattenLifecyclesArray(lifecycle, description) {
    if (!Array.isArray(lifecycle)) {
      lifecycle = [lifecycle];
    }

    if (!lifecycle.length) {
      lifecycle = [() => Promise.resolve()];
    }

    return props => new Promise((resolve, reject) => {
      function waitForPromises(index) {
        let fn = lifecycle[index](props);

        if (!smellLikePromise(fn)) {
          reject(new Error(`${description} has error`));
        } else {
          fn.then(() => {
            if (index >= lifecycle.length - 1) {
              resolve();
            } else {
              waitForPromises(++index);
            }
          }).catch(reject);
        }
      }

      waitForPromises(0);
    });
  }
  function getProps(app) {
    return {
      name: app.name,
      ...app.customProps
    };
  }

  function toLoadPromise(app) {
    if (app.status !== NOT_LOADED) {
      return Promise.resolve(app);
    }

    app.status = LOAD_SOURCE_CODE;
    let loadPromise = app.loadFunction(getProps(app));

    if (!smellLikePromise(loadPromise)) {
      app.status = SKIP_BECAUSE_BROKEN;
      return Promise.reject(new Error(''));
    }

    return loadPromise.then(appConfig => {
      if (typeof appConfig !== 'object') {
        throw new Error('loadPromise must return a promise or thennable object');
      }

      let errors = [];
      ['bootstrap', 'mount', 'unmount'].forEach(lifecycle => {
        if (!appConfig[lifecycle]) {
          errors.push(`lifecycle: ${lifecycle} must be exists`);
        }
      });

      if (errors.length) {
        app.status = SKIP_BECAUSE_BROKEN;
        console.log(errors);
        return app;
      }

      app.status = NOT_BOOTSTRAPPED;
      app.bootstrap = flattenLifecyclesArray(appConfig.bootstrap, `app: ${app.name} bootstrapping`);
      app.mount = flattenLifecyclesArray(appConfig.mount, `app: ${app.name} mounting`);
      app.unmount = flattenLifecyclesArray(appConfig.unmount, `app: ${app.name} unmounting`);
      app.timeouts = ensureTimeout(appConfig.timeouts);
      return app;
    }).catch(e => {
      app.status = LOAD_ERROR;
      console.log(e);
    });
  }

  function toBootstrapPromise(app) {
    if (app.status !== NOT_BOOTSTRAPPED) {
      return Promise.resolve(app);
    }

    app.status = BOOTSTRAPPING;
    return reasonableTime(app.bootstrap(getProps(app)), `app: ${app.name} bootstrapping`, app.timeouts.bootstrap).then(() => {
      app.status = NOT_MOUNTED;
      return app;
    }).catch(e => {
      app.status = SKIP_BECAUSE_BROKEN;
      console.log("toBootstrapPromise -> e", e);
      return app;
    });
  }

  function toUnmountPromise(app) {
    if (app.status !== MOUNTED) {
      return Promise.resolve(app);
    }

    app.status = UNMOUNTING;
    return reasonableTime(app.unmount(getProps(app)), `app: ${app.name} unmounting`, app.timeouts.unmount).then(() => {
      app.status = NOT_MOUNTED;
      return app;
    }).catch(e => {
      console.log("toUnmountPromise -> e", e);
      app.status = SKIP_BECAUSE_BROKEN;
      return app;
    });
  }

  function toMountPromise(app) {
    if (app.status !== NOT_MOUNTED) {
      return Promise.resolve(app);
    }

    app.status = MOUNTING;
    return reasonableTime(app.mount(getProps(app)), `app: ${app.name} mounting`, app.timeouts.mount).then(() => {
      app.status = MOUNTED;
      return app;
    }).catch(e => {
      console.log("toMountPromise -> e", e); // 如果app 挂载失败，那么立即执行 unmount 操作

      app.status = MOUNTED; // toUnmountPromise

      return toUnmountPromise(app);
    });
  }

  const HIJACK_EVENTS_NAME = /^(hashchange|popstate)$/i;
  const EVENTS_POOL = {
    hashchange: [],
    popstate: []
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
      EVENTS_POOL[eventName].indexOf(handler) === -1 && EVENTS_POOL[eventName].push(handler);
    } else {
      originalAddEventListener.apply(this, arguments);
    }
  };

  window.removeEventListener = function (eventName, handler) {
    if (eventName && HIJACK_EVENTS_NAME.test(eventName)) {
      let events = EVENTS_POOL[eventName];
      events.indexOf(handler) > -1 && (EVENTS_POOL[eventName] = events.filter(fn => fn !== handler));
    } else {
      originalRemoveEventListener.apply(this, arguments);
    }
  };

  function mockPopStateEvent(state) {
    return new PopStateEvent('popstate', {
      state
    });
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

  function callCapturedEvents(eventsArgs) {
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

  let appChangesUnderway = false;
  let changesQueue = [];
  function invoke(pendings = [], eventArgs) {
    if (appChangesUnderway) {
      return new Promise((resolve, reject) => {
        changesQueue.push({
          success: resolve,
          failure: reject,
          eventArgs
        });
      });
    }

    appChangesUnderway = true;

    if (isStarted()) {
      // 系统已启动，切换页面，需要先卸载之前的app
      return performAppChanges();
    } // 系统未启动，只加载APP（按需预加载）


    return loadApps();

    function loadApps() {
      let loadPromises = getAppsToLoad().map(toLoadPromise); // 获取需要被load的app

      return Promise.all(loadPromises).then(() => {
        callAllCapturedEvents();
        return finish();
      }).catch(e => {
        callAllCapturedEvents();
        console.log("loadApps -> e", e);
      });
    }

    function performAppChanges() {
      // getAppsToUnmount
      let unmountApps = getAppsToUnmount();
      let unmountPromises = Promise.all(unmountApps.map(toUnmountPromise)); // getAppsToLoad

      let loadApps = getAppsToLoad();
      let loadPromises = loadApps.map(app => {
        return toLoadPromise(app).then(toBootstrapPromise).then(() => unmountPromises).then(() => toMountPromise(app));
      }); // will mount app

      let mountApps = getAppsToMount().filter(app => loadApps.indexOf(app) === -1);
      let mountPromises = mountApps.map(app => {
        return toBootstrapPromise(app).then(() => unmountPromises).then(() => toMountPromise(app));
      });
      return unmountPromises.then(() => {
        callAllCapturedEvents();
        let loadAndMountPromises = loadPromises.concat(mountPromises);
        return Promise.all(loadAndMountPromises).then(finish).catch(ex => {
          pendings.forEach(item => item.failure(ex));
        });
      }).catch(e => {
        callAllCapturedEvents();
        console.log("performAppChanges -> e", e);
        throw e;
      });
    }

    function finish() {
      let returnValue = getMountedApps();

      if (pendings.length) {
        pendings.forEach(item => item.success(returnValue));
      }

      appChangesUnderway = false;

      if (changesQueue.length) {
        let backup = changesQueue;
        changesQueue = [];
        return invoke(backup);
      }

      return returnValue;
    }

    function callAllCapturedEvents() {
      pendings && pendings.length && pendings.filter(item => item.eventArgs).forEach(item => callCapturedEvents(item.eventArgs));
      eventArgs && callCapturedEvents(eventArgs);
    }
  }

  const APPS = [];
  /**
   * 注册app
   * @param {string} appName - 要注册的app的名称
   * @param {Function<Promise> | Object} loadFunction - app异步加载函数或app内容
   * @param {Function<boolean>} activityWhen - 判断该app应该在何时被启动
   * @param {Object} customProps - 自定义配置
   * @returns {Promise}
   */

  function registerApplication(appName, loadFunction, activityWhen, customProps = {}) {
    if (!appName || typeof appName !== 'string') {
      throw new Error('appName must be a non-empty string');
    }

    if (!loadFunction) {
      throw new Error('loadFunction must bu a function or object');
    }

    if (typeof loadFunction !== 'function') {
      loadFunction = () => Promise.resolve(loadFunction);
    }

    if (typeof activityWhen !== 'function') {
      throw new Error('activityWhen must be a function');
    }

    APPS.push({
      name: appName,
      loadFunction,
      activityWhen,
      customProps,
      status: NOT_LOADED
    });
    console.log("registerApplication -> APPS", APPS);
    invoke();
  }
  function getAppsToLoad() {
    return APPS.filter(noSkip).filter(noLoadError).filter(isntLoaded).filter(shouldBeActive);
  }
  function getAppsToUnmount() {
    return APPS.filter(noSkip).filter(isActive).filter(shouldntBeActive);
  }
  function getAppsToMount() {
    // 没有中断，已经加载过的，没有被mount的，应该被mount
    return APPS.filter(noSkip).filter(isLoaded).filter(isntActive).filter(shouldBeActive);
  } // 获取当前已经被挂载的app

  function getMountedApps() {
    return APPS.filter(isActive);
  }

  exports.registerApplication = registerApplication;
  exports.start = start;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=my-single-spa.js.map
