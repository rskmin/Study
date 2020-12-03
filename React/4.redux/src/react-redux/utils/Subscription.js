class Subscription {
  constructor(store) {
    this.listeners = [];
    // 订阅仓库变化事件, 当藏狐状态发生变化的时候执行回调
    store.subscribe(this.notify.bind(this));
  }
  subscribe(listener) {
    this.listeners.push(listener);
  }
  notify() { // 通知监听函数执行
    this.listeners.forEach(l => l());
  }
}

export default Subscription;