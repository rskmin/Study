import React from './react';
import ReactDOM from './react-dom';

let root = document.getElementById('root');

// class ScrollList extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       message: [],
//     };
//     this.wrapper = React.createRef();
//   }
//   addMessage() {
//     this.setState({
//       message: [`${this.state.message.length}`, ...this.state.message]
//     });
//   }
//   getSnapshotBeforeUpdate() {
//     return {
//       prevScrollTop: this.wrapper.current.scrollTop, // 上次卷曲的高度
//       prevScrollHeight: this.wrapper.current.scrollHeight, // 上次内容的高度
//     }
//   }
//   componentDidUpdate(prevProps, prevState, { prevScrollTop, prevScrollHeight }) {
//     this.wrapper.current.scrollTop = prevScrollTop + (
//       this.wrapper.current.scrollHeight - prevScrollHeight
//     )
//   }
//   componentDidMount() {
//     this.timer = setInterval(() => {
//       this.addMessage();
//     }, 1000);
//   }
//   render() {
//     let style = {
//       height: '100px',
//       width: '200px',
//       border: '1px solid red',
//       overflow: 'auto',
//     }
//     return (
//       <div style={style} ref={this.wrapper}>
//         {
//           this.state.message.map((message, index) => (
//             <div key={index}>{message}</div>
//           ))
//         }
//       </div>
//     )
//   }

// }

class Counter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      number: 0
    };
  }
  handleClick = (event) => {
    this.setState({number: this.state.number + 1});
  }
  render() {
    return (
      <div>
        {this.state.number % 2 === 0 ? <p>{this.state.number}</p> : <button>{this.state.number}</button>}
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }

}

ReactDOM.render(<Counter />, root);