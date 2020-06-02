import Circle from './Circle'
import Rectangle from './Rectangle'
import Square from './Square'

export default class ShapeFactory {
  getShape(shapeType: String) {
    if (shapeType === null) {
      return null
    }

    shapeType = shapeType.toLocaleUpperCase()
    if (shapeType === 'CIRCLE') {
      return new Circle()
    } else if (shapeType === 'RECTANGLE') {
      return new Rectangle()
    } else if (shapeType === 'SQUARE') {
      return new Square()
    }

    return null
  }
}