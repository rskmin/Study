interface IOptions {
  value: number;
  weight: number;
  itemsInStock: number;
}

export default class KnapsackItem {
  value: number
  weight: number
  itemsInStock: number
  quantity: number
  /**
   * @param options
   * @param options.value 物体价格
   * @param options.weight 物体权重
   * @param options.itemInStock 允许被添加的数量
   */
  constructor({ value, weight, itemsInStock = 1 }: IOptions) {
    this.value = value;
    this.weight = weight;
    this.itemsInStock = itemsInStock;
    // 添加到背包的实际数量
    this.quantity = 1;
  }
  get totalValue(): number {
    return this.value * this.quantity;
  }
  get totalWeight(): number {
    return this.weight * this.quantity;
  }
  get valuePerWeightRatio(): number {
    return this.value / this.weight;
  }
  toString(): string {
    return `v:${this.value}, w:${this.weight}, x:${this.quantity}`;
  }
}