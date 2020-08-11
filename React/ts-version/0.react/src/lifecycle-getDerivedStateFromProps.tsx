/* eslint-disable no-invalid-this */
import React from 'react'
import ReactDOM from 'react-dom'
interface Props {}
interface State { number: number }

class Counter extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      number: 0
    }
  }
  handleClick = () => {
    this.setState({ number: this.state.number + 1 })
  }
  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
        <hr />
        <ChildCounter n={this.state.number} />
      </div>
    )
  }
}

interface ChildCounterProps {
  n: number
}
interface ChildCounterState {
  number: number
}
class ChildCounter extends React.Component<ChildCounterProps> {
  state = { number: 0 }
  static getDerivedStateFromProps(nextProps: ChildCounterProps, prevState: ChildCounterState) {
    const { n } = nextProps
    if (n % 2 === 0) {
      return { number: n * 2 }
    }
    return { number: n * 3 }
  }
  shouldComponentUpdate(nextProps: ChildCounterProps, nextState: ChildCounterState): boolean {
    return nextState.number % 2 === 0
  }
  render() {
    return (
      <div>
        {this.state.number}
      </div>
    )
  }
}

ReactDOM.render(<Counter />, document.getElementById('root'))