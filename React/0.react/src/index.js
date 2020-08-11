import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class From extends Component {
  constructor(props) {
    super(props)
    this.textInput = React.createRef()
    this.state = {
      text: 'hello'
    }
  }
  add = () => {
    console.log(this.state.text)
  }
  handleChange = event => {
    this.setState({text: event.target.value})
  }
  render() {
    return (
      <>
        <input value={this.state.text} onChange={this.handleChange} />
        <button onClick={this.add}>focus</button>
      </>
    )
  }
}


// function TextInput(props, ref) {
//   return <input ref={ref} />
// }
// let TextInput1 = React.forwardRef(TextInput)
// class TextInput extends Component {
//   constructor(props) {
//     super(props)
//     this.textInput = React.createRef()
//   }
//   render() {
//     return <input ref={this.textInput} />
//   }
// }

ReactDOM.render(<From/>, document.getElementById('root'))