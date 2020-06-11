import ShapeDecorator from './ShapeDecorator'
import Shape from './Shape';

export default class RedShapeDecorator extends ShapeDecorator {
  
  constructor(decoratedShape: Shape) {
    super(decoratedShape)
  }

  draw(): void {
    this.decoratedShape.draw()
    this.setRedBorder(this.decoratedShape)
  }

  setRedBorder(decoratedShape: Shape): void {
    console.log('Border Color: Red')
  }
}