// 创建观察对象
class Observer {
  // 构造函数
  constructor(data) {
    // 提供一个解析方法，完成属性的分析、劫持
    this.observe(data)
  }

  // 解析数据，完成对数据属性的"挟持"（控制对象属性的getter和setter方法）
  observe(data) {

    // 判断数据的有效性（必须是对象）
    if (!data || typeof data !== 'object')
      return;
    // 针对当前对象属性的重新定义（挟持）
    let keys = Object.keys(data)
    // 遍历
    keys.forEach(key => {
      // 重新定义key
      this.defineReactive(data, key, data[key])
    })
  }

  defineReactive(obj, key, val) {
    let dep = new Dep()
    // 重新定义
    Object.defineProperty(obj, key, {
      enumerable: true,
      configable: false,
      get() {
        // 针对watcher创建时，直接完成发布订阅的添加
        Dep.target && dep.addSub(Dep.target)

        return val
      },
      set(newValue) {
        val = newValue

        dep.notify()
      }
    })
  }
}

// 创建发布者
  // 管理订阅者
  // 通知
class Dep {
  constructor() {
    this.subs = []
  }

  // 添加订阅
  addSub(sub) {
    this.subs.push(sub)
  } 
  // 集体通知
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}