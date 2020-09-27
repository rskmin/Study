import { BOOTSTRAPPING, NOT_BOOTSTRAPPED, NOT_MOUNTED, SKIP_BECAUSE_BROKEN } from '../applications/apps.helper';
import { reasonableTime } from '../applications/timeouts';
import { getProps } from './helper';

export function toBootstrapPromise(app) {
  if (app.status !== NOT_BOOTSTRAPPED) {
    return Promise.resolve(app);
  }
  app.status = BOOTSTRAPPING;

  return reasonableTime(app.bootstrap(getProps(app)),
    `app: ${app.name} bootstrapping`,
    app.timeouts.bootstrap)
    .then(() => {
      app.status = NOT_MOUNTED;
      return app;
    })
    .catch(e => {
      app.status = SKIP_BECAUSE_BROKEN;
      console.log("toBootstrapPromise -> e", e);
      return app;
    });
}