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
    console.log('Counter 1.set up props and state');
  }
  componentWillMount() {
    console.log('Counter 2.componentWillMount');
  }
  handleClick = () => {
    this.setState({number: this.state.number + 1});
  }
  render() {
    console.log('Counter 3.render');
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    );
  }
  componentDidMount() {
    console.log('Counter 4.componentDidMount');
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('Counter 5.shouldComponentUpdate');
    return nextState.number % 2 === 0;
  }
  componentWillUpdate() {
    console.log('Counter 6.componentWillUpdate');
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('Counter 7.componentDidUpdate');
  }
}
ReactDOM.render(<Counter />, root);