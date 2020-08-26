/* eslint-disable no-invalid-this */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

interface IProps {
  render: (value: IState) => React.ReactNode
}

interface IState {
  x: number
  y: number
}

class MouseTracker extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0
    };
  }
  handleMouseMove = (event: React.MouseEvent) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }
  render() {
    return (
      <div onMouseMove={this.handleMouseMove} style={{ border: '1px solid red' }}>
        {this.props.render(this.state)}
      </div>
    );
  }
}

// 普通函数组件
const MyComponent = (value: IState) => (
  <div>
    <p>请现在移动鼠标</p>
    <p>当前鼠标的位置x: {value.x},y: {value.y}</p>
  </div>
)

function withMouseTracker(OldComponent: React.FC<IState>) {
  return (props: any) => {
    return (
      <MouseTracker render={
        mouseProps => <OldComponent {...props} {...mouseProps} />
      } />
    )
  }
}

const WithMouseTrackerMyComponent = withMouseTracker(MyComponent);

ReactDOM.render(<WithMouseTrackerMyComponent />, document.getElementById('root'));