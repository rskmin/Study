/* eslint-disable no-unused-expressions */
class Transaction {
  constructor(wrappers) {
    this.wrappers = wrappers // {initialize, close}
  }
  perform(anyMethod) {
    this.wrappers.forEach(wrapper => wrapper.initialize())
    anyMethod()
    this.wrappers.forEach(wrapper => wrapper.close())
  }
}

let batchingStrategy = {
  isBatchingUpdates: false, // 默认是非批量更新模式
  dirtyComponents: [], // 脏组件: 组件的状态和界面上显示的不一样
  batchedUpdates() {
    this.dirtyComponents.forEach(component => component.updateComponent())
  }
}

class Updater {
  constructor(component) {
    this.component = component
    this.pendingStates = []
  }
  addState(partialState) {
    this.pendingStates.push(partialState)
    batchingStrategy.isBatchingUpdates ?
      batchingStrategy.dirtyComponents.push(this.component) :
      this.component.updateComponent()
  }
}

class Component {
  constructor(props) {
    this.props = props
    this.$updater = new Updater(this)
  }
  /**
   * 通过DOM字符串创建DOM
   * @param {*} domString - dom 字符串
   */
  createDOMFromDOMString(domString) {
    let div = document.createElement('div')
    div.innerHTML = domString
    return div.children[0]
  }
  /**
   * 设置组件状态并更新视图
   * @param {*} partialState - 组件的部分状态
   */
  setState(partialState) {
    // 缓存版本
    this.$updater.addState(partialState)
  }
  updateComponent() {
    this.$updater.pendingStates.forEach(partialState => Object.assign(this.state, partialState))
    this.$updater.pendingStates.length = 0
    let oldElement = this.domElement
    let newElement = this.renderElement()
    oldElement.parentElement.replaceChild(newElement, oldElement)
  }
  renderElement() {
    let htmlString = this.render()
    this.domElement = this.createDOMFromDOMString(htmlString)
    // 将当前组件的实例挂到 dom 上
    this.domElement.component = this
    return this.domElement
  }
  mount(container) {
    container.appendChild(this.renderElement())
  }
}

let transaction = new Transaction([
  {
    initialize() {
      batchingStrategy.isBatchingUpdates = true
    },
    close() {
      batchingStrategy.isBatchingUpdates = false
      batchingStrategy.batchedUpdates() // 进行批量更新 , 把所有的脏组件根据自己的状态和属性重新渲染
    }
  }
])
window.trigger = function(event, method) {
  let component = event.target.component
  transaction.perform(component[method].bind(component, event))
}
class Counter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      number: 0
    }
  }
  add() {
    this.setState({number: this.state.number+1})
    console.log(this.state.number)
    this.setState({number: this.state.number+1})
    console.log(this.state.number)
    setTimeout(() => {
      this.setState({number: this.state.number+1})
      console.log(this.state.number)
      this.setState({number: this.state.number+1})
      console.log(this.state.number)
    })
  }
  render() {
    return (
      `<button id="counter-app" onclick="trigger(event, 'add')">
        ${this.props.name}:${this.state.number}
      </button>`
    )
  }
}