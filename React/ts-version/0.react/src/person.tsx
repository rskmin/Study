import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

let root: HTMLElement | null = document.getElementById('root')

interface PersonProps extends Record<string, any> {
  name?: string
  gender?: 'male' | 'female'
  hobby?: Array<string>
  position?: { x: number, y: number}
  age?: number
}

class Person extends React.Component<PersonProps> {
  // 定义默认属性
  static defaultProps: PersonProps = {
    name: '???'
  }
  // 属性校验
  static propTypes = {
    name: PropTypes.string.isRequired,
    gender: PropTypes.oneOf(['male', 'female']).isRequired,
    hobby: PropTypes.arrayOf(PropTypes.string),
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }),
    age(props: PersonProps, propName: string, componentName: string): Error | null {
      let age = props[propName]
      if (age < 0 || age > 100) {
        return new Error(`Invalid Prop ${propName} supplied to ${componentName}`)
      }
      return null
    }
  }
  render() {
    let { name, gender, age, hobby, position = {} } = this.props
    return (
      <div>
        <p>name:{name}</p>
        <p>gender:{gender}</p>
        <p>age:{age}</p>
        <p>hobby:{hobby}</p>
        <p>position:{position.toString()}</p>
      </div>
    )
  }
}

let PersonProps: PersonProps = {
  gender: 'male',
  hobby: ['football', 'basketball'],
  position: { x: 100, y: 100 }
}

ReactDOM.render(<Person {...PersonProps} />, root)