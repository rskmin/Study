import Item from './Item'

// 套餐类
export default class Meal {
  private items: Array<Item> = []

  addItem(item: Item): Meal {
    this.items.push(item)
    return this
  }

  getCost(): number {
    return this.items.reduce((acc, cur) => acc + cur.price(), 0)
  }

  showItems(): void {
    for (const item of this.items) {
      console.log(`Item : ${item.name()}, Packing : ${item.packing().pack()}, Price : ${item.price()}`)
    }
  }
}
