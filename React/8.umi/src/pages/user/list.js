import React from 'react';
import styles from './list.css';
import { Link } from 'umi';

export default () => {
  return (
    <div>
      <h1 className={styles.title}>Page user/list</h1>
      <ul>
        <li><Link to='/user/detail/1'>张三</Link></li>
        <li><Link to='/user/detail/2'>李四</Link></li>
      </ul>
    </div>
  );
}
