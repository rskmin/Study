/* eslint-disable no-invalid-this */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

interface Props {

}

interface State {
  x: number
  y: number
}

class MouseTracker extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      x: 0,
      y: 0
    }
  }
  handleMouseMove = (event: React.MouseEvent) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    })
  }
  render() {
    return (
      <div onMouseMove={this.handleMouseMove}>
        <p>请现在移动鼠标</p>
        <p>当前鼠标的位置</p>
      </div>
    )
  }
}

ReactDOM.render(<MouseTracker />, document.getElementById('root'))