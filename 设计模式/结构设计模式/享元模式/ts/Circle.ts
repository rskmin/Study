import Shape from './Shape'

export default class Circle implements Shape {
  private color: string
  private x: number = 0
  private y: number = 0
  private radius: number = 0

  constructor(color: string) {
    this.color = color
  }

  setX(x: number): void {
    this.x = x
  }

  setY(y: number): void {
    this.y = y
  }

  setRadius(radius: number): void {
    this.radius = radius
  }

  draw(): void {
    console.log(`Circle: Draw() [Color : "${this.color}", x : "${this.x}", y : "${this.radius}", radius : "${this.radius}"]`)
  }

}