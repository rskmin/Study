// 观察者模式(基于发布订阅的，而且观察者模式发布订阅之间是有关联的) 发布订阅模式
// 观察者模式 观察者、被观察者 (被观察者需要收集所有的观察者)

class Subject {// 被观察者
  constructor(name) {
    this.name = name
    this.observer = []
    this.state = '开心'
  }
  attach(o) {
    this.observer.push(o)
  }
  setState(newState) {
    this.state = newState
    this.observer.forEach(o => o.update(this))
  }
}

class Observer {// 观察者
  constructor(name) {
    this.name = name
  }
  update(baby) {
    console.log(`${this.name}知道了当前${baby.name}状态是${baby.state}`)
  }
}

// 被观察者需要收集所有的观察者

let baby = new Subject('baby')
let o1 = new Observer('father')
let o2 = new Observer('mother')
baby.attach(o1)
baby.attach(o2)

baby.setState('不开心')
baby.setState('开心')