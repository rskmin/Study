import ComputerPartVisitor from "./ComputerPartVisitor";

export default interface ComputerPart {
  accept(computerPartVisitor: ComputerPartVisitor): void
}