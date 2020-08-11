import React from 'react'
import ReactDOM from 'react-dom'

interface ComponentProps {
  value: string
}

interface State {
  value: string
}
const fromLocal = (OldComponent: React.FC<ComponentProps> | React.ComponentClass<ComponentProps>) => {
  return class extends React.Component<ComponentProps, State> {
    state = { value: '' }
    componentDidMount() {
      let value = localStorage.getItem(this.props.value)
      value && this.setState({ value })
    }
    render() {
      return <OldComponent value={this.state.value}/>
    }
  }
}

const fromAjax = (OldComponent: React.FC<ComponentProps>) => {
  return class extends React.Component<ComponentProps, State> {
    state = { value: '' }
    componentDidMount() {
      fetch('/name.json').then(response => response.json()).then(result => {
        this.setState({
          value: result[this.props.value]
        })
      })
    }
    render() {
      return <OldComponent value={this.state.value}/>
    }
  }
}

const UserName = (props: ComponentProps) => {
  return <input defaultValue={props.value}/>
}

const FromAjaxUserName = fromAjax(UserName)
const FromLocalUsername = fromLocal(FromAjaxUserName)

ReactDOM.render(<FromLocalUsername value='username' />, document.getElementById('root'))