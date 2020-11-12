/**
 * 判断是否是PC端
 * @returns {boolean}
 */
const isPC = () => {
  let userAgentInfo = navigator.userAgent;
  const Agents = ["Android", "iPhone",
    "SymbianOS", "Windows Phone",
    "iPad", "iPod"];
  let flag = true;
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

const ua = navigator.userAgent.toLowerCase();
/**
 * 判断是否是移动端
 * @returns {boolean}
 */
const isDeviceMobile = () => {
  return /android|webos|iphone|ipod|balckberry/i.test(ua);
}

/**
 * @typedef MobileEvents
 * @property {Event} touchstart 触摸开始（手指放在触摸屏上）
 * @property {Event} touchmove 拖动（手指在触摸屏上移动）
 * @property {Event} touchend 触摸结束（手指从触摸屏上移开）
 * @property {Event} touchenter 移动的手指进入一个dom元素
 * @property {Event} touchleave 移动的手指离开一个dom元素
 * @property {Event} touchcancel 在拖动中断时候触发
 */

// 模拟移动端事件

/**
 * 创建事件
 * @param {string} [name] 事件名称
 * @param {boolean} [bubbles] 是否冒泡
 * @param {boolean} [cancelable] 是否可取消
 * @returns {Event}
 */
function createEvent(name, bubbles, cancelable) {
  const event = document.createEvent('Events');
  name && event.initEvent(name, bubbles, cancelable);
  return event;
}
const _mobileEvents = {};
/** @type {MobileEvents} */
const mobileEvents = {};
Object.defineProperties(mobileEvents, {
  touchstart: {
    get() {
      if (!_mobileEvents.touchstart) {
        _mobileEvents.touchstart = createEvent('touchstart', true, true);
      }
      return _mobileEvents.touchstart;
    },
    enumerable: true,
  },
  touchmove: {
    get() {
      if (!_mobileEvents.touchmove) {
        _mobileEvents.touchmove = createEvent('touchmove', true, true);
      }
      return _mobileEvents.touchmove;
    },
    enumerable: true,
  },
  touchend: {
    get() {
      if (!_mobileEvents.touchend) {
        _mobileEvents.touchend = createEvent('touchend', true, true);
      }
      return _mobileEvents.touchend;
    },
    enumerable: true,
  },
  touchenter: {
    get() {
      if (!_mobileEvents.touchenter) {
        _mobileEvents.touchenter = createEvent('touchenter', true, true);
      }
      return _mobileEvents.touchenter;
    },
    enumerable: true,
  },
  touchleave: {
    get() {
      if (!_mobileEvents.touchleave) {
        _mobileEvents.touchleave = createEvent('touchleave', true, true);
      }
      return _mobileEvents.touchleave;
    },
    enumerable: true,
  },
  touchcancel: {
    get() {
      if (!_mobileEvents.touchcancel) {
        _mobileEvents.touchcancel = createEvent('touchcancel', true, true);
      }
      return _mobileEvents.touchcancel;
    },
    enumerable: true,
  },
});

export {
  isPC,
  isDeviceMobile,
  ua,
  mobileEvents,
  createEvent,
}