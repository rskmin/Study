/**
 * 欧几里得算法 - 求最大公约数
 * 两个非负整数不全为 0
 * @param {number} m - 非负整数
 * @param {number} n - 非负整数
 */
function euclideanAlgorithm(m, n) {
  if (n === 0) return m;
  return euclideanAlgorithm(n, m % n);
}

module.exports = euclideanAlgorithm;