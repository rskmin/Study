import { MOUNTED, MOUNTING, NOT_MOUNTED } from "../applications/apps.helper";
import { reasonableTime } from "../applications/timeouts";
import { getProps } from "./helper";
import { toUnmountPromise } from "./unmount";

export function toMountPromise(app) {
  if (app.status !== NOT_MOUNTED) {
    return Promise.resolve(app);
  }
  app.status = MOUNTING;

  return reasonableTime(app.mount(getProps(app)),
    `app: ${app.name} mounting`,
    app.timeouts.mount)
    .then(() => {
      app.status = MOUNTED;
      return app;
    })
    .catch(e => {
      console.log("toMountPromise -> e", e);
      // 如果app 挂载失败，那么立即执行 unmount 操作
      app.status = MOUNTED;
      // toUnmountPromise
      return toUnmountPromise(app);
    });
}