export default interface Expression {
  interpret(context: string): boolean
}