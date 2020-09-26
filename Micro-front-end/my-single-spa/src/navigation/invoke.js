import {isStarted} from '../start';
import {getAppsToLoad} from '../applications/apps';
import {toLoadPromise} from '../lifecycles/load.js';

let appChangesUnderway = false;
let changesQueue = [];

export function invoke() {
  if (appChangesUnderway) {
    return new Promise((resolve, reject) => {
      changesQueue.push({
        success: resolve,
        failure: reject,
      });
    });
  }
  appChangesUnderway = true;
  if (isStarted()) {

  } else {
    loadApps();
  }

  function loadApps() {
    // 获取需要被load的app
    getAppsToLoad().map(toLoadPromise);
  }
}