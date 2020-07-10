/**
 * 当你需要对 Stock 命令进行管理时，将它们包装成对象
 */
export default class Stock {
  private name: string = 'ABC'
  private quantity: number = 10

  buy(): void {
    console.log(`Stock [ Name: ${this.name}, Quantity: ${this.quantity} ] bought`)
  }

  sell(): void {
    console.log(`Stock [ Name: ${this.name}, Quantity: ${this.quantity} ] sold`)
  }
}