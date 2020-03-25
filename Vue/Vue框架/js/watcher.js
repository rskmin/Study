// 申明一个订阅者
class Watcher {
  // 构造函数
  // 1) 需要订阅功能的对象
  // 2） 全局vm对象，用于获取数据
  // 3） 发布时需要做的事情
  constructor(vm, expr, cb) {
    // 缓存重要属性
    this.vm = vm
    this.expr = expr
    this.cb = cb

    //缓存当前值
    this.value = this.get()

  }
  // 过去当前值
  get() {
    // 把当前订阅者添加到全局
    Dep.target = this
    // 获取当前值
    let value = this.vm.$data[this.expr]
    // 清空全局
    Dep.target = null
    return value
  }

  // 提供一个更新方法
  update() {
    // 获取新值
    let newValue = this.vm.$data[this.expr]
    // 获取老值
    let oldValue = this.value
    // 判断后
    if(newValue !== oldValue) {
      // 执行回调
      this.cb(newValue)
    }
  }
}