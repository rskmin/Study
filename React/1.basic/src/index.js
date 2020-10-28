import React from './react';
import ReactDOM from './react-dom';

let root = document.getElementById('root');

class Counter extends React.Component {
  static defaultProps = {
    name: 'rskmin',
  }
  constructor(props) {
    super(props);
    this.state = {number: 0};
    console.log('父 1.set up props and state');
  }
  componentWillMount() {
    console.log('父 2.componentWillMount');
  }
  handleClick = () => {
    this.setState({number: this.state.number + 1});
  }
  render() {
    console.log('父 3.render');
    return (
      <div id={`counter-${this.state.number}`}>
        <p>{this.state.number}</p>
        <CounterChild count={this.state.number} />
        {/* {this.state.number % 4 === 0 ? null : <CounterChild count={this.state.number} />} */}
        <button onClick={this.handleClick}>+</button>
      </div>
    );
  }
  componentDidMount() {
    console.log('父 4.componentDidMount');
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('父 5.shouldComponentUpdate');
    return nextState.number % 2 === 0;
  }
  componentWillUpdate() {
    console.log('父 6.componentWillUpdate');
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('父 7.componentDidUpdate');
  }
}

class CounterChild extends React.Component {
  constructor(props) {
    super(props);
    console.log('子 1.set up props and state');
  }
  componentWillMount() {
    console.log('子 2.componentWillMount');
  }
  render() {
    console.log('子 3.render');
    return (
      <div id={`counter-child-${this.props.count}`}>{this.props.count}</div>
    );
  }
  componentDidMount() {
    console.log('子 4.componentDidMount');
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('子 5.shouldComponentUpdate');
    return true;
  }
  componentWillUpdate() {
    console.log('子 6.componentWillUpdate');
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('子 7.componentDidUpdate');
  }
}
ReactDOM.render(<Counter />, root);