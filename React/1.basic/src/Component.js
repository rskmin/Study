import ReactDOM from './react-dom';
import { isFunction } from './utils';

/**
 * 更新队列
 */
export const updateQueue = {
  updaters: new Set(), // 更新器数组
  isBatchingUpdate: false, // 批量更新标志
  /**
   * 增加一个更新器
   * @param {Updater} updater 
   */
  add(updater) {
    this.updaters.add(updater);
  },
  /**
   * 强制批量实现组件更新
   */
  batchUpdate() {
    this.updaters.forEach(updater => updater.updateComponent());
    this.isBatchingUpdate = false;
    this.updaters.clear();
  },
};

/**
 * 组件状态更新器 - 暂存要改变的状态进行批量更新
 */
class Updater {
  /**
   * @param {Component} classInstance - 类组件实例
   */
  constructor(classInstance) {
    this.classInstance = classInstance;
    this.pendingStates = []; // 等待更新的状态
  }
  /**
   * @param {Obj} partialState - 分状态
   */
  addState(partialState) {
    this.pendingStates.push(partialState);
    // updateQueue.isBatchingUpdate ? updateQueue.add(this) : this.updateComponent();
    this.emitUpdate(); // 发射更新
  }
  /**
   * 发射更新
   */
  emitUpdate() {
    updateQueue.isBatchingUpdate ? updateQueue.add(this) : this.updateComponent();
  }
  /**
   * 开始更新组件状态
   */
  updateComponent() {
    const { classInstance, pendingStates } = this;
    if (pendingStates.length > 0) {
      // classInstance.state = this.getState();
      // classInstance.forceUpdate();
      // 无论是否真正更新页面，组件的state都在this.getState进行了更新
      shouldUpdate(classInstance, this.getState());
    }
  }
  /**
   * 根据老状态和等待生效的新状态，得到最后新状态
   */
  getState() {
    const { classInstance, pendingStates } = this;
    let { state } = classInstance;
    if (pendingStates.length > 0) {
      pendingStates.forEach(nextState => {
        if (isFunction(nextState)) {
          nextState = { ...state, ...nextState(state) };
        }
        state = { ...state, ...nextState };
      });
      pendingStates.length = 0;
    }
    return state;
  }
}

/**
 * 判断组件是否应该更新
 * @param {Component} classInstance - 类组件实例
 * @param {Obj} nextState - 类组件的下一个状态
 */
function shouldUpdate(classInstance, nextState) {
  classInstance.state = nextState;
  if (classInstance.shouldComponentUpdate
    && !classInstance.shouldComponentUpdate(classInstance.props, nextState)) return;
  classInstance.forceUpdate();
}

/**
 * React.Component 类组件
 */
class Component {
  static isReactComponent = true;
  constructor(props) {
    this.props = props;
    this.state = {};
    this.updater = new Updater(this);
  }
  /**
   * 更新state
   * @param {Obj} partialState - 新的部分状态
   */
  setState(partialState) {
    this.updater.addState(partialState);
  }
  /**
   * 强制更新组件
   */
  forceUpdate() {
    this.componentWillUpdate && this.componentWillUpdate();
    let renderVdom = this.render();
    updateClassComponent(this, renderVdom);
  }
}

/**
 * 更新类组件实例
 * @param {Component} classInstance - 类组件实例
 * @param {import('./react-dom').vdom} renderVdom - 虚拟DOM
 */
function updateClassComponent(classInstance, renderVdom) {
  let oldDOM = classInstance.dom;
  let newDOM = ReactDOM.createDOM(renderVdom);
  oldDOM.parentNode.replaceChild(newDOM, oldDOM);
  classInstance.componentDidUpdate && classInstance.componentDidUpdate();
  classInstance.dom = newDOM;
}

export default Component;