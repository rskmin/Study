import Iterator from './Iterator'
import Container from './Container'


export default class NameRepository implements Container {
  names: Array<string> = ['Robert', 'John', 'Julie', 'Lora']

  /**
   * @override
   */
  getIterator(): Iterator {
    return this.getNameIterator()
  }

  private getNameIterator(): Iterator {
    const names = this.names
    class NameIterator implements Iterator {
      index: number = 0

      hasNext(): boolean {
        return this.index < names.length ? true : false
      }
      next(): Object | null {
        return this.hasNext() ? names[this.index++] : null
      }
    }
    return new NameIterator()
  }

}
