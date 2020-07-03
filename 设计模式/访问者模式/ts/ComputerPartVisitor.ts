import Computer from './Computer'
import Mouse from './Mouse'
import Keyboard from './Keyboard'
import Monitor from './Monitor'

export default interface ComputerPartVisitor {
  visit(computer: Computer): void
  visit(mouse: Mouse): void
  visit(keyboard: Keyboard): void
  visit(monitor: Monitor): void
}
