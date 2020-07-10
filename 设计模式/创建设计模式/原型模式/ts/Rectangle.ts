import Shape from './Shape'

export default class Rectangle extends Shape {
  constructor() {
    super()
    this.type = 'Rectangle'
  }
  draw() {
    console.log('Inside Rectangle::draw() method.')
  }
}
