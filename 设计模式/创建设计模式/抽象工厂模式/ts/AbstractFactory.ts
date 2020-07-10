import Color from './Color'
import Shape from './Shape'

export default abstract class AbstractFactory {
  abstract getColor(color: string): Color | null
  abstract getShape(shape: string): Shape | null
}
