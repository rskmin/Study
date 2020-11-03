import { SimpleFunction } from '../shims';

type Listener = (SimpleFunction & { fn?: any });
type ListenName = string | symbol;
export type PlainEvent = ReturnType<typeof createPlainEvent>;

export function createPlainEvent() {
  const getListenMap = (() => {
    let events: Map<ListenName, Listener[]>;
    return () => {
      if (!events) { // 被调用才创建 Map 对象
        events = new Map<ListenName, Listener[]>();
      }
      return events;
    }
  })();

  const event = {
    on: (listenName: ListenName, fn: SimpleFunction) => {
      const listenMap = getListenMap();
      const map = listenMap.get(listenName);
      if (!!map) {
        map.push(fn);
      } else {
        listenMap.set(listenName, [fn]);
      }
      return () => event.off(listenName, fn);
    },
    once: (listenName: ListenName, fn: SimpleFunction) => {
      const on: Listener = (...args: any[]) => {
        event.off(listenName, fn);
        fn(...args);
      };
    },
    off: (listenName: ListenName, fn?: SimpleFunction) => {
      const listenMap = getListenMap();
      const listeners = listenMap.get(listenName);
      if (!listeners) return;
      if (!fn) { // 移除 listenName 的所有监听器
        listenMap.set(listenName, []);
        return;
      }
      for (let i = 0; i < listeners.length; i++) {
        const listener = listeners[i];
        if (fn === listener || (!!listener.fn && fn === listener.fn)) {
          listeners.splice(i, 1);
          break;
        }
      }
    },
    emit: (listenName: ListenName, ...args: any[]) => {
      const listeners = getListenMap().get(listenName);
      if (!!listeners) {
        listeners.forEach(listener => listener(...args));
      }
    }
  }
  return event;
}