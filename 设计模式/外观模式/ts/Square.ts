import Shape from './Shape'

export default class Square implements Shape {
  draw(): void {
    console.log('Square::draw()')
  }
}
