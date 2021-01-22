import * as is from './is';

/**
 * 
 * @param {*} baseState 原状态
 * @param {*} produce 处理器
 */
export let INTERNAL = Symbol('INTERNAL');
export function produce(baseState, produce) {
  let proxy = toProxy(baseState);
  produce(proxy);
  const internal = proxy[INTERNAL];
  return internal.mutated ? internal.draftState : internal.baseState;
}

export function toProxy(baseState, callParentCopy) {
  let keyToProxy = {}; // key映射的代理对象
  // 存储的是内部的状态
  let internal = {
    baseState,
    draftState: createDraftState(baseState), // 先进行一次浅拷贝
    keyToProxy,
    mutated: false, // 此对象是否发生了变更
  }
  return new Proxy(baseState, {
    get(target, key) {
      if (key === INTERNAL) {
        return internal;
      }
      let value = target[key]; // baseState.list = ['1']
      // 当你访问某个属性的时候我们就要对这个属性进行代理
      if (is.isObject(value) || is.isArray(value)) {
        if (key in keyToProxy) { // 已经代理过
          return keyToProxy[key];
        } else { // 未代理过进行代理
          keyToProxy[key] = toProxy(value, () => {
            internal.mutated = true;
            const proxyChild = keyToProxy[key];
            let { draftState:childDraftState } = proxyChild[INTERNAL];
            internal.draftState[key] = childDraftState;
            callParentCopy && callParentCopy();
          });
        }
        return keyToProxy[key]; // 返回代理对象
      } else if (is.isFunction(value)) {
        internal.mutated = true;
        callParentCopy && callParentCopy();
        return value.bind(internal.draftState);
      }
      return internal.mutated ? internal.draftState[key] : internal.baseState[key]; // 值类型不需要处理
    },
    set(target, key, value) {
      // 不管给那个字段修改值，都要把当前 mutated 属性设置 true
      internal.mutated = true;
      // const { draftState } = internal;
      internal.draftState[key] = value;
      callParentCopy && callParentCopy();
      return true;
    }
  });
}

function createDraftState(baseState) {
  if (is.isObject(baseState)) {
    return Object.assign({}, baseState);
  } else if (is.isArray(baseState)) {
    return [...baseState];
  } else {
    return baseState;
  }
}