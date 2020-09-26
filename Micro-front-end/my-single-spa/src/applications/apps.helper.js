export const NOT_LOADED = {
  status: 'NOT_LOADED',
}

export const SKIP_BECAUSE_BROKEN = {
  status: 'SKIP_BECAUSE_BROKEN',
}

export const LOAD_ERROR = {
  status: 'LOAD_ERROR',
}

export const LOAD_SOURCE_CODE = {
  status: 'LOAD_SOURCE_CODE',
}

export function noSkip(app) {
  return app.status !== SKIP_BECAUSE_BROKEN;
}

export function noLoadError(app) {
  return app.status !== LOAD_ERROR;
}

export function isntLoaded(app) {
  return app.status === NOT_LOADED;
}

export function shouldBeActive(app) {
  try {
    return app.activityWhen(window.location);
  } catch (e) {
    app.status = SKIP_BECAUSE_BROKEN;
    console.log(e);
  }
}
