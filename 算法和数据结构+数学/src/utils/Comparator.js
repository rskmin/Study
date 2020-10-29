/**
 * 比较器
 */
class Comparator {
  /**
   * @param {Function} [compareFunction] 自定义比较方法
   */
  constructor(compareFunction) {
    this.isReverse = false;
    this.compare = compareFunction || Comparator.defaultCompareFunction;
    this.originalCompare = this.compare;
  }
  /**
   * 默认比较方法
   * @param {*} a 比较数1
   * @param {*} b 比较数2
   * @returns {number} a - b
   */
  static defaultCompareFunction(a, b) {
    if (a === b) return 0; // 判断对象
    return a - b;
  }
  /**
   * 两数是否相等
   * @param {*} a 比较数1
   * @param {*} b 比较数2
   * @returns {boolean}
   */
  equal(a, b) {
    return this.compare(a, b) === 0;
  }
  /**
   * a 是否小于 b
   * @param {*} a 比较数1
   * @param {*} b 比较数2
   */
  lessThan(a, b) {
    return this.compare(a, b) < 0;
  }
  /**
   * a 是否大于 b
   * @param {*} a 比较数1
   * @param {*} b 比较数2
   * @returns {boolean}
   */
  greaterThan(a, b) {
    return this.compare(a, b) > 0;
  }
  /**
   * 小于等于
   * @param {*} a 比较数1
   * @param {*} b 比较数2
   * @returns {boolean}
   */
  lessThenOrEqual(a, b) {
    return this.lessThan(a, b) || this.equal(a, b);
  }
  /**
   * 大于等于
   * @param {*} a 比较数1
   * @param {*} b 比较数2
   * @returns {boolean}
   */
  greaterThenOrEqual(a, b) {
    return this.greaterThan(a, b) || this.equal(a, b);
  }
  reverse() {
    this.isReverse ?
      (this.compare = (a, b) => this.originalCompare(b, a)) : 
      (this.compare = this.originalCompare);
    this.isReverse = !this.isReverse;
  }
}

module.exports = Comparator;