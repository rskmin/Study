import { popTarget, pushTarget } from './dep';

let id = 0;

class Watcher {
  // exprOrFn vm._update(vm._render())
  constructor(vm, exprOrFn, cb, options) {
    this.vm = vm;
    this.exprOrFn = exprOrFn;
    this.cb = cb;
    this.options = options;
    this.id = id++; // watcher 的唯一标识
    this.deps = [];

    if (typeof exprOrFn === 'function') {
      this.getter = exprOrFn;
    }
    this.get();
  }
  addDep(dep) {
    this.deps.push(dep);
  }
  get() {
    pushTarget(this); // 当前watcher实例
    this.getter(); // 调用exprOrFn 渲染页面
    popTarget();
  }
  update() {
    this.get();
  }
}

export default Watcher;