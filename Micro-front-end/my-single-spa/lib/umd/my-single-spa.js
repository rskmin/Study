(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.mySingleSpa = {}));
}(this, (function (exports) { 'use strict';

  const NOT_LOADED = {
    status: 'NOT_LOADED'
  };
  const SKIP_BECAUSE_BROKEN = {
    status: 'SKIP_BECAUSE_BROKEN'
  };
  const LOAD_ERROR = {
    status: 'LOAD_ERROR'
  };
  const LOAD_SOURCE_CODE = {
    status: 'LOAD_SOURCE_CODE'
  };
  function noSkip(app) {
    return app.status !== SKIP_BECAUSE_BROKEN;
  }
  function noLoadError(app) {
    return app.status !== LOAD_ERROR;
  }
  function isntLoaded(app) {
    return app.status === NOT_LOADED;
  }
  function shouldBeActive(app) {
    try {
      return app.activityWhen(window.location);
    } catch (e) {
      app.status = SKIP_BECAUSE_BROKEN;
      console.log(e);
    }
  }

  function start() {}

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

    return new Promise((resolve, reject) => {
      function waitForPromises(index) {
        let fn = lifecycle[index]();

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

  function toLoadPromise(app) {
    if (app.status !== NOT_LOADED) {
      return Promise.resolve(app);
    }

    app.status = LOAD_SOURCE_CODE;
    let loadPromise = app.loadFunction();

    if (!smellLikePromise(loadPromise)) {
      return Promise.reject(new Error(''));
    }

    loadPromise.then(appConfig => {
      if (typeof appConfig !== 'object') {
        throw new Error('');
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
        return;
      }

      app.bootstrap = flattenLifecyclesArray(appConfig.bootstrap, `app: ${app.name} bootstrapping`);
      app.mount = flattenLifecyclesArray(appConfig.mount, `app: ${app.name} mounting`);
      app.unmount = flattenLifecyclesArray(appConfig.unmount, `app: ${app.name} unmounting`);
    });
  }

  let appChangesUnderway = false;
  function invoke() {
    if (appChangesUnderway) {
      return new Promise((resolve, reject) => {
      });
    }

    appChangesUnderway = true;

    {
      loadApps();
    }

    function loadApps() {
      // 获取需要被load的app
      getAppsToLoad().map(toLoadPromise);
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

  function registerApplication(appName, loadFunction, activityWhen, customProps) {
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
    try {
      console.time('filter');
      return APPS.filter(noSkip).filter(noLoadError).filter(isntLoaded).filter(shouldBeActive); // return filterWith(APPS, noSkip, noLoadError, isntLoaded, shouldBeActive);
    } finally {
      console.timeEnd('filter');
    }
  }

  exports.registerApplication = registerApplication;
  exports.start = start;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=my-single-spa.js.map
