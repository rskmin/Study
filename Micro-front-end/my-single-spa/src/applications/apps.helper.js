export const NOT_LOADED = {
  status: 'NOT_LOADED',
}
export const LOAD_SOURCE_CODE = {
  status: 'LOAD_SOURCE_CODE',
}
export const NOT_BOOTSTRAPPED = {
  status: 'NOT_BOOTSTRAPPED',
}
export const BOOTSTRAPPING = {
  status: 'BOOTSTRAPPING',
}
export const NOT_MOUNTED = {
  status: 'NOT_MOUNTED',
}
export const MOUNTING = {
  status: 'MOUNTING',
}
export const MOUNTED = {
  status: 'MOUNTED',
}
export const UNMOUNTING = {
  status: 'UNMOUNTING',
}
export const UPDATING = {
  status: 'UPDATING',
}
export const SKIP_BECAUSE_BROKEN = {
  status: 'SKIP_BECAUSE_BROKEN',
}
export const LOAD_ERROR = {
  status: 'LOAD_ERROR',
}

export function noSkip(app) {
  return app.status !== SKIP_BECAUSE_BROKEN;
}

export function noLoadError(app) {
  return app.status !== LOAD_ERROR;
}

export function isLoaded(app) {
  return app.status !== NOT_LOADED && app.status !== SKIP_BECAUSE_BROKEN && app.status !== LOAD_ERROR;
}

export function isntLoaded(app) {
  return !isLoaded(app);
}

export function shouldBeActive(app) {
  try {
    return app.activityWhen(window.location);
  } catch (e) {
    app.status = SKIP_BECAUSE_BROKEN;
    console.log(e);
  }
}

export function shouldntBeActive(app) {
  try {
    return !app.activityWhen(window.location);
  } catch (e) {
    app.status = SKIP_BECAUSE_BROKEN;
    console.log(e);
  }
}

export function isActive(app) {
  return app.status === MOUNTED;
}

export function isntActive(app) {
  return !isActive(app);
}
