import React from 'react'
import ReactDOM from 'react-dom'

let root = document.getElementById('root');

let element = React.createElement('h1', {
  className: 'title',
  style: {
    color: 'red',
  },
}, React.createElement('span', null, 'hello'), 'world');

ReactDOM.render(element, root);