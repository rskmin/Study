import Shape from './Shape'
import Color from './Color'
import AbstractFactory from './AbstractFactory'
import Red from './Red'
import Green from './Green'
import Blue from './Blue'

export default class ColorFactory extends AbstractFactory {
  getShape(shapeType: string): Shape | null {
    return null
  }

  getColor(colorType: string): Color | null {
    if (colorType == null) {
      return null
    }
    colorType = colorType.toLocaleUpperCase()
    if (colorType === 'RED') {
      return new Red()
    } else if (colorType === 'GREEN') {
      return new Green()
    } else if (colorType === 'BLUE') {
      return new Blue()
    }
    return null
  }
}