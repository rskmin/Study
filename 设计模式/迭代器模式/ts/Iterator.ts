export default interface Iterator {
  hasNext(): boolean
  next(): Object | null
}
