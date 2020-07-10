import Shape from './Shape'

export default class Rectangle implements Shape {
  draw(): void {
    console.log('Inside Rectangle::draw() method.')
  }
}