import Order from './Order'

export default class Broker {
  private orderList: Array<Order> = []

  takeOrder(order: Order): void {
    this.orderList.push(order)
  }

  placeOrders(): void {
    for (let order of this.orderList) {
      order.execute()
    }
    this.orderList.length = 0
  }
}
