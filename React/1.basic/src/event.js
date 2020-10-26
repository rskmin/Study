import { updateQueue } from './Component';

/**
 * 给那个 DOM 元素绑定哪种类型的事件
 * @param {HTMLElement} dom - DOM元素 
 * @param {string} eventType - 事件类型
 * @param {Function} listener - 事件监听器 
 */
export function addEvent(dom, eventType, listener) {
  const store = dom.store || (dom.store = {});
  store[eventType] = listener;
  // document.addEventListener(eventType.slice(2), dispatchEvent, false);
  if (!document[eventType]) {
    document[eventType] = dispatchEvent;
  }
}


const syntheticEvent = {};
/**
 * @param {Event} event - 原生DOM事件
 */
function dispatchEvent(event) {
  let { target, type } = event;
  const eventType = `on${type}`;
  updateQueue.isBatchingUpdate = true;
  const syntheticEvent = createSyntheticEvent(event);
  while (target) { // 模拟事件冒泡
    let { store } = target;
    const listener = store && store[eventType];
    listener && listener.call(target, syntheticEvent);
    target = target.parentNode;
  }
  for (let key in syntheticEvent) {
    syntheticEvent[key] = null;
  }
  updateQueue.batchUpdate();
}
/**
 * 构造合成DOM事件
 * @param {Event} nativeEvent - 原生DOM事件
 */
function createSyntheticEvent(nativeEvent) {
  for (let key in nativeEvent) {
    syntheticEvent[key] = nativeEvent[key];
  }
  return syntheticEvent;
}