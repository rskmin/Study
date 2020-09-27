import {
  NOT_LOADED,
  LOAD_SOURCE_CODE,
  SKIP_BECAUSE_BROKEN,
  NOT_BOOTSTRAPPED,
  LOAD_ERROR
} from '../applications/apps.helper';
import { ensureTimeout } from '../applications/timeouts';
import {
  smellLikePromise,
  flattenLifecyclesArray,
  getProps
} from './helper';

export function toLoadPromise(app) {
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
    [
      'bootstrap',
      'mount',
      'unmount',
    ].forEach(lifecycle => {
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