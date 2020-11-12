/**
 * 判断一个十进制数是否是正数
 * @param {number} number 十进制整数
 * @returns {boolean}
 */
function isPositive(number) {
  if (number === 0) return false;
  return ((number >> 31) & 1) === 0;
}

module.exports = isPositive;