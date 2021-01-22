import React from 'react';
import { Link } from 'umi';

export default class extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to='/user'>user</Link></li>
          <li><Link to='/user/list'>user/list</Link></li>
          <li><Link to='/user/add'>user/add</Link></li>
        </ul>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}