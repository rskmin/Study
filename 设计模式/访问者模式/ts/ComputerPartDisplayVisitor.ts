import ComputerPartVisitor from './ComputerPartVisitor'
import Computer from './Computer'
import Mouse from './Mouse'
import Keyboard from './Keyboard'
import Monitor from './Monitor'
import ComputerPart from './ComputerPart'

// 方法重载
export default class ComputerPartDisplayVisitor implements ComputerPartVisitor {
  visit(computer: Computer): void
  visit(mouse: Mouse): void
  visit(keyboard: Keyboard): void
  visit(monitor: Monitor): void
  visit(computerPart: ComputerPart): void {
    if (computerPart instanceof Computer) {
      console.log('Displaying Computer.')
    } else if (computerPart instanceof Mouse) {
      console.log('Displaying Mouse.')
    } else if (computerPart instanceof Keyboard) {
      console.log('Displaying Keyboard.')
    } else if (computerPart instanceof Monitor) {
      console.log('Displaying Monitor.')
    }
  }
}