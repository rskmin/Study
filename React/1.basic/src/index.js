import React from './react';
import ReactDOM from './react-dom';

class Counter extends React.PureComponent {
  state = { name: 'rskmin', number: 0 };
  onClick = (event) => {
    this.setState({number: this.state.number + 1 });
  }
  render() {
    console.log('render');
    let element = (
      <div>
      <p>name:{null} {this.state.name}</p>
      <p>number: {this.state.number}</p>
      <button onClick={this.onClick}>+</button>
    </div>
    );
    return (
     element
    )
  }
}

ReactDOM.render(<Counter />, document.getElementById('root'));