import Image from './Image'

export default class RealImage implements Image {
  private fileName: string

  constructor(fileName: string) {
    this.fileName = fileName
    this.loadFromDisk(fileName)
  }

  display(): void {
    console.log(`Displaying ${this.fileName}`)
  }

  loadFromDisk(fileName: string) {
    console.log(`Loading ${this.fileName}`)
  }
}