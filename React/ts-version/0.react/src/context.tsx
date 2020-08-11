/* eslint-disable no-invalid-this */
import React from 'react'
import ReactDOM from 'react-dom'

interface ContextValue {
  color: string
  changeColor: (color: string) => void
}

interface ContextProps<T> {
  value: T
}

function createContext<T>(defaultValue: T) {

  interface State {
    value: T
  }

  class Provider extends React.Component<ContextProps<T>, State> {
    static value: T = defaultValue
    constructor(props: ContextProps<T>) {
      super(props)
      Provider.value = props.value
      this.state = {
        value: props.value
      }
    }
    static getDerivedStateFromProps(nextProps: ContextProps<T>, prevState: State) {
      Provider.value = nextProps.value
      return { ...prevState, value: nextProps.value }
    }
    render() {
      return this.props.children
    }
  }

  interface ConsumerProps {
    children: (value: T) => React.ReactNode
  }
  class Consumer extends React.Component<ConsumerProps> {
    render() {
      return this.props.children(Provider.value)
    }
  }

  return {
    Provider, Consumer
  }
}

const ColorContext = createContext<ContextValue>(null)
// ColorContext = {Provider, Consumer}

class Header extends React.Component {
  render() {
    return (
      <ColorContext.Consumer>
        {
          (value: ContextValue) => (
            <div style={{ border: `5px solid ${value.color}`, padding: 5 }}>
              Header
              <Title />
            </div>
          )
        }
      </ColorContext.Consumer>
    )
  }
}

class Title extends React.Component {
  render() {
    return (
      <ColorContext.Consumer>
        {
          (value: ContextValue) => (
            <div style={{ border: `5px solid ${value.color}`, padding: 5 }}>
              Title
            </div>
          )
        }
      </ColorContext.Consumer>
    )
  }
}

class Main extends React.Component {
  render() {
    return (
      <ColorContext.Consumer>
        {
          (value: ContextValue) => (
            <div style={{ border: `5px solid ${value.color}`, padding: 5 }}>
              Header
              <Content />
            </div>
          )
        }
      </ColorContext.Consumer>
    )
  }
}

class Content extends React.Component {
  render() {
    return (
      <ColorContext.Consumer>
        {
          (value: ContextValue) => (
            <div style={{ border: `5px solid ${value.color}`, padding: 5 }}>
              Content
              <button onClick={() => value.changeColor('red')}>变红</button>
              <button onClick={() => value.changeColor('green')}>变绿</button>
            </div>
          )
        }
      </ColorContext.Consumer>
    )
  }
}

interface PanelProps {}
interface PanelState {
  color: string
}
class Panel extends React.Component<PanelProps, PanelState> {
  constructor(props: PanelProps) {
    super(props)
    this.state = {
      color: 'red'
    }
  }
  changeColor = (color: string) => {
    this.setState({ color })
  }
  render() {
    let ContextValue: ContextValue = {
      color: this.state.color,
      changeColor: this.changeColor
    }
    return (
      <ColorContext.Provider value={ContextValue}>
        <div style={{ border: `5px solid ${this.state.color}`, padding: 5, width: 200 }}>
          Panel
          <Header />
          <Main />
        </div>
      </ColorContext.Provider>
    )
  }
}

ReactDOM.render(<Panel />, document.getElementById('root'))