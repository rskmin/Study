class Dep {
  constructor() {
    this.subs = [];
  }
  depend() {
    // 我们希望 watcher 可以存放 dep
    Dep.target.addDep(this);
    // this.subs.push(Dep.target);
  }
  notify() {
    this.subs.forEach(watcher => watcher.update());
  }
}

Dep.target = null;
export function pushTarget(watcher) {
  Dep.target = watcher;
}

export function popTarget() {
  Dep.target = null;
}

export default Dep;