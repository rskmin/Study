import Shape from './Shape'
import Color from './Color'
import AbstractFactory from './AbstractFactory'
import Circle from './Circle'
import Rectangle from './Rectangle'
import Square from './Square'

export default class ShapeFactory extends AbstractFactory {
  getShape(shapeType: string): Shape | null {
    if (shapeType == null) {
      return null
    }
    shapeType = shapeType.toLocaleUpperCase()
    if (shapeType === 'CIRCLE') {
      return new Circle()
    } else  if (shapeType === 'RECTANGLE') {
      return new Rectangle()
    } else  if (shapeType === 'SQUARE') {
      return new Square()
    }
    return null
  }

  getColor(color: string): Color | null {
    return null
  }
}
