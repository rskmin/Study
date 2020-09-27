import { isStarted } from '../start';
import {
  getAppsToLoad,
  getAppsToMount,
  getAppsToUnmount,
  getMountedApps
} from '../applications/apps';
import { toLoadPromise } from '../lifecycles/load.js';
import { toBootstrapPromise } from '../lifecycles/bootstrap.js';
import { toMountPromise } from '../lifecycles/mount.js';
import { toUnmountPromise } from '../lifecycles/unmount.js';
import { callCapturedEvents } from './hijackLocations.js';

let appChangesUnderway = false;
let changesQueue = [];

export function invoke(pendings = [], eventArgs) {
  if (appChangesUnderway) {
    return new Promise((resolve, reject) => {
      changesQueue.push({
        success: resolve,
        failure: reject,
        eventArgs,
      });
    });
  }
  appChangesUnderway = true;
  if (isStarted()) { // 系统已启动，切换页面，需要先卸载之前的app
    return performAppChanges();
  }
  // 系统未启动，只加载APP（按需预加载）
  return loadApps();

  function loadApps() {
    let loadPromises = getAppsToLoad().map(toLoadPromise);
    // 获取需要被load的app
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
    let unmountPromises = Promise.all(unmountApps.map(toUnmountPromise));
    // getAppsToLoad
    let loadApps = getAppsToLoad();
    let loadPromises = loadApps.map(app => {
      return toLoadPromise(app).then(toBootstrapPromise)
        .then(() => unmountPromises).then(() => toMountPromise(app));
    });

    // will mount app
    let mountApps = getAppsToMount().filter(app => loadApps.indexOf(app) === -1);
    let mountPromises = mountApps.map(app => {
      return toBootstrapPromise(app).then(() => unmountPromises).then(() => toMountPromise(app));
    })

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