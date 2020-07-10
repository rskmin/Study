import Shape from "./Shape";
import Circle from "./Circle";
import Square from "./Square";
import Rectangle from "./Rectangle";

export default class ShapeCache {
  private static shapeMap = new Map()

  static getShape(shapeId: string): Shape {
    const cachedShape: Shape = this.shapeMap.get(shapeId)
    return cachedShape.clone()
  }

  static loadCache(): void {
    const circle: Circle = new Circle()
    circle.setId('1')
    this.shapeMap.set(circle.getId(), circle)

    const square: Square = new Square()
    square.setId('2')
    this.shapeMap.set(square.getId(), square)

    const rectangle: Rectangle = new Rectangle()
    rectangle.setId('3')
    this.shapeMap.set(rectangle.getId(), rectangle)
  }
}
