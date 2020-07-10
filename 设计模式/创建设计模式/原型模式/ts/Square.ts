import Shape from './Shape'

export default class Square extends Shape {
  constructor() {
    super()
    this.type = 'Square'
  }
  draw() {
    console.log('Inside Square::draw() method.')
  }
}
