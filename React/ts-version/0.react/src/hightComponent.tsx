import React from 'react'
import ReactDOM from 'react-dom'


/**
 * 高阶组件
 * 组件可以作为函数则参数和返回值
 */

function logger(OldComponent) {
  return class extends React.Component {
    start: number
    componentWillMount() {
      this.start = Date.now()
    }
    componentDidMount() {
      console.log('组件渲染一共花了 ' + (Date.now() - this.start) + ' ms')
    }
    render() {
      return <OldComponent />
    }
  }
}

class Hello extends React.Component {
  render() {
    return (
      <div>
        hello
      </div>
    )
  }
}

let LoggerHello = logger(Hello)
ReactDOM.render(<LoggerHello />, document.getElementById('root'))