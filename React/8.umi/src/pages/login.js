import React from 'react';
import styles from './login.css';
import { Link, history } from 'umi';

export default (props) => {
  return (
    <div>
      <h1 className={styles.title}>登陆</h1>
      <button onClick={() => {
        localStorage.setItem('isLogin', true);
        if (props.location.state && props.location.state.from) {
          history.push(props.location.state.from);
        } else {
          history.push('/');
        }
      }}>登陆</button>
    </div>
  );
}
