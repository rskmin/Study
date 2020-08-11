/* eslint-disable no-invalid-this */
import React from 'react'
import ReactDOM from 'react-dom'

interface Props {}
interface State { number: number }

class Counter extends React.Component<Props, State> {
  static defaultProps = {
    name: 'rskmin'
  }
  constructor(props: Props) {
    super(props)
    this.state = {
      number: 0
    }
    console.log('1. constructor 构造函数')
  }
  handleClick = () => {
    this.setState({ number: this.state.number + 1 })
  }
  componentWillMount() {
    console.log('2. 组件将要加载 componentWillMount')
  }
  componentDidMount() {
    console.log('4. 组件挂载完成 componentDidMount')
  }
  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    console.log('5. 组件是否更新 shouldComponentUpdate')
    return nextState.number % 2 === 0
  }
  componentWillUpdate() {
    console.log('6. 组件将要更新 componentWillUpdate')
  }
  componentDidUpdate() {
    console.log('8. 组件更新完成 componentDidUpdate')
  }
  render() {
    console.log('3. render || 7. 组件重新渲染')
    let { number } = this.state
    return (
      <div>
        <p>{number}</p>
        {number > 3 ? null : <ChildCounter n={number} />}
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}

interface ChildCounterProps {
  n: number
}
class ChildCounter extends React.Component<ChildCounterProps> {
  componentWillUnmount() {
    console.log('child 组件将要卸载 componentWillUnmount')
  }
  componentWillMount() {
    console.log('child componentWillMount')
  }
  componentDidMount() {
    console.log('child componentDidMount')
  }
  componentWillReceiveProps(newProps: ChildCounterProps) {
    console.log('child componentWillReceiveProps')
  }
  shouldComponentUpdate(nextProps: ChildCounterProps, nextState: State) {
    return nextProps.n % 3 === 0
  }
  render() {
    console.log('child-render')
    let { n } = this.props
    return (
      <div>
        {n}
      </div>
    )
  }
}

ReactDOM.render(<Counter />, document.getElementById('root'))