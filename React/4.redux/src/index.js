import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from './react-redux';
import store from './store';

import Counter1 from './component/Counter1';
import Counter2 from './component/Counter2';

ReactDOM.render(
  <Provider store={store}>
    <Counter1 />
    <hr />
    <Counter2 />
  </Provider>
  , document.getElementById('root'));