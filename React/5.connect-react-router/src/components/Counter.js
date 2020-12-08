import React from 'react';
import { connect } from 'react-redux';
import actions from '../store/actions/counter';

class Counter extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.number}</p>
        <button onClick={() => this.props.add({ type: 'ADD' })}>+</button>
        <button onClick={() => this.props.go('/')}>访问/</button>
      </div>
    )
  }
}

const mapStateToProps = state => state.counter;

export default connect(mapStateToProps, actions)(Counter);