import KnapsackItem from './KnapsackItem';

export default class Knapsack {
  selectedItems: KnapsackItem[] = [];
  /**
   * @param possibleItems 物品列表
   * @param weightLimit 最大重量
   */
  constructor(
    public possibleItems: KnapsackItem[],
    public weightLimit: number
  ) {
    this.possibleItems = possibleItems;
    this.weightLimit = weightLimit;
  }
  /**
   * 按重量从小到大
   */
  sortPossibleItemsByWeight() {
    this.possibleItems.sort((a, b) => a.weight - b.weight);
  }
  /**
   * 按价格从大到小
   */
  sortPossibleItemsByValue() {
    this.possibleItems.sort((a, b) => b.value - a.value);
  }
  /**
   * 按单位重量价格从大到小
   */
  sortPossibleItemsByValuePerWeightRatio() {
    this.possibleItems.sort((a, b) => b.valuePerWeightRatio - a.valuePerWeightRatio);
  }
  /**
   * 0/1 背包问题
   */
  solveZeroOneKnapsackProblem() {
    // f[i][v] = max{f[i - 1][v], f[i - 1][v - c[i]] + w[i]}
  }
  /**
   * 多重背包问题
   */
  solveBoundedKnapsackProblem() {

  }
  /**
   * 完全背包问题
   */
  solveUnboundedKnapsackProblem() {
  }
  get totalValue() {
    return this.selectedItems.reduce((acc, item) => acc + item.totalValue, 0);
  }
  get totalWeight() {
    return this.selectedItems.reduce((acc, item) => acc + item.totalWeight, 0);
  }
}