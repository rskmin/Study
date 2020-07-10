import Shape from "./Shape"
import Circle from "./Circle"
import Rectangle from "./Rectangle"
import Square from "./Square"

export default class ShapeMaker {
  private circle: Shape
  private rectangle: Shape
  private square: Shape

  constructor() {
    this.circle = new Circle()
    this.rectangle = new Rectangle()
    this.square = new Square()
  }

  drawCircle(): void {
    this.circle.draw()
  }

  drawRectangle(): void {
    this.rectangle.draw()
  }

  drawSquare(): void {
    this.square.draw()
  }
}
