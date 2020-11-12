/**
 * 判断一个数是否是偶数
 * @param {number} number 十进制整数
 * @return {boolean}
 */
function isEven(number) {
  // 通过二进制位的最后一位来判断
  return (number & 1) === 0;
}

module.exports = isEven;