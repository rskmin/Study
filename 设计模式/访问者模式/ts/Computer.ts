import Mouse from './Mouse'
import Keyboard from './Keyboard'
import Monitor from './Monitor'
import ComputerPart from './ComputerPart'
import ComputerPartVisitor from './ComputerPartVisitor'

export default class Computer implements ComputerPart {
  parts: Array<ComputerPart>
  constructor() {
    this.parts = [new Mouse(), new Keyboard(), new Monitor()]
  }

  accept(computerPartVisitor: ComputerPartVisitor): void {
    for (let i = 0, len = this.parts.length; i < len; i++) {
      this.parts[i].accept(computerPartVisitor)
    }
    computerPartVisitor.visit(this)
  }
}