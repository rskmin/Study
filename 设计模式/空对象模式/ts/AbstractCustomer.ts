export default abstract class AbstractCustomer {
  protected name?: string
  abstract isNil(): boolean
  abstract getName(): string | undefined
}