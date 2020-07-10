import Shape from './Shape'

export default class Circle extends Shape {
  constructor() {
    super()
    this.type = 'Circle'
  }
  draw() {
    console.log('Inside Circle::draw() method.')
  }
}
