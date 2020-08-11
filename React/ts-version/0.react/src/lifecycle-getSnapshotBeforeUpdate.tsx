import React, { RefObject } from 'react'
import ReactDOM from 'react-dom'

interface Props {

}
interface State {
  messages: Array<string>
}
class ScrollList extends React.Component<Props, State> {
  timer?: NodeJS.Timeout
  wrapper: RefObject<HTMLDivElement>
  constructor(props: Props) {
    super(props)
    this.state = {
      messages: []
    }
    this.wrapper = React.createRef()
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        messages: [`message-${this.state.messages.length}`, ...this.state.messages]
      })
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.timer!)
  }
  getSnapshotBeforeUpdate(): number {
    return this.wrapper.current!.scrollHeight
  }
  componentDidUpdate(prevProps: Props, prevState: State, prevScrollHeight: number) {
    this.wrapper.current!.scrollTop += this.wrapper.current!.scrollHeight - prevScrollHeight
  }
  render() {
    let style = {
      height: 100,
      width: 200,
      border: '1px solid red',
      overflow: 'auto'
    }
    return (
      <div style={style} ref={this.wrapper}>
        {
          this.state.messages.map((message: string, index: number) => (
            <div key={index}>{message}</div>
          ))
        }
      </div>
    )
  }
}

ReactDOM.render(<ScrollList />, document.getElementById('root'))