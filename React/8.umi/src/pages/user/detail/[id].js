import React from 'react';
import styles from './id.css';
import { Link } from 'umi';

export default (props) => {
  return (
    <div>
      <h1 className={styles.title}>ID: {props.match.params.id}</h1>
    </div>
  )
}