import Shape from './Shape'

export default class Circle implements Shape {
  draw(): void {
    console.log('Shape: Circle')
  }
}
