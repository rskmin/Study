import styles from './profile.css';
import { history } from 'umi';
import React, { Component } from 'react';
class Profile extends Component {
  render() {
    return (
      <div>
        <h1 className={styles.title}>Page profile</h1>
        <button onClick={() => history.goBack()}>返回</button>
      </div>
    )
  }
}

// Profile.wrappers = ['@/wrappers/auth'];
export default Profile;