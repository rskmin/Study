import ComputerPart from './ComputerPart'
import ComputerPartVisitor from './ComputerPartVisitor'

export default class Mouse implements ComputerPart {
  accept(computerPartVisitor: ComputerPartVisitor): void {
    computerPartVisitor.visit(this)
  }
}