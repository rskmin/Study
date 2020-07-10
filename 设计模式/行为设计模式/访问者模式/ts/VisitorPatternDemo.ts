import Computer from './Computer'
import ComputerPartDisplayVisitor from './ComputerPartDisplayVisitor'

const computer = new Computer()

computer.accept(new ComputerPartDisplayVisitor())
