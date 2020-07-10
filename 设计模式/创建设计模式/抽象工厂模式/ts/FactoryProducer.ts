import ShapeFactory from './ShapeFactory'
import ColorFactory from './ColorFactory'
import AbstractFactory from './AbstractFactory'

export default class FactoryProducer {
  static getFactory(choice: string): AbstractFactory | null {
    choice = choice.toLocaleUpperCase()
    if (choice === 'SHAPE') {
      return new ShapeFactory()
    } else if (choice === 'COLOR') {
      return new ColorFactory()
    }
    return null
  }
}

