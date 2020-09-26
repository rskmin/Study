import {
  NOT_LOADED,
  noSkip,
  noLoadError,
  isntLoaded,
  shouldBeActive,
} from './apps.helper';
import { invoke } from '../navigation/invoke.js';
// import {filterWith} from '../utils/optimize-function.js';

const APPS = [];

/**
 * 注册app
 * @param {string} appName - 要注册的app的名称
 * @param {Function<Promise> | Object} loadFunction - app异步加载函数或app内容
 * @param {Function<boolean>} activityWhen - 判断该app应该在何时被启动
 * @param {Object} customProps - 自定义配置
 * @returns {Promise}
 */
export function registerApplication(appName, loadFunction, activityWhen, customProps) {
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
    status: NOT_LOADED,
  });
  console.log("registerApplication -> APPS", APPS);
  invoke();
}

export function getAppsToLoad() {
  try {
    console.time('filter');
    return APPS.filter(noSkip).filter(noLoadError).filter(isntLoaded).filter(shouldBeActive);
    // return filterWith(APPS, noSkip, noLoadError, isntLoaded, shouldBeActive);
  } finally {
    console.timeEnd('filter');
  }
}