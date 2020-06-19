import Iterator from "./Iterator";

export default interface Container {
  getIterator(): Iterator
}
