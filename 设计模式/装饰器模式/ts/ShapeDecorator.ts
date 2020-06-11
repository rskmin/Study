import Shape from './Shape'

export default abstract class ShapeDecorator implements Shape {
  protected decoratedShape: Shape

  constructor(decoratedShape: Shape) {
    this.decoratedShape = decoratedShape
  }

  draw(): void {
    this.decoratedShape.draw()
  }
}
