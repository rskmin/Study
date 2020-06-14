import Circle from "./Circle";

export default class ShapeFactory {
  private static circleMap: Map<string, Circle> = new Map()

  static getCircle(color: string): Circle {

    let circle: Circle | undefined = this.circleMap.get(color)

    if (circle == null) {

      circle = new Circle(color)
      this.circleMap.set(color, circle)
      console.log(`Create circle of color: ${color}`)
    }

    return <Circle>circle
  }
}