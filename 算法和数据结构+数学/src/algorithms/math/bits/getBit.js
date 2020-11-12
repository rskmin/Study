/**
 * 获取一个十进制数指定二进制位上的值
 * @param {number} number 十进制整数
 * @param {number} bitPosition 二进制位
 * @returns {1|0}
 * @example getBit(10, 1) ->  1010 >> 1 & 1 = 1
 */
function getBit(number, bitPosition) {
  // 将指定二进制位移动到0位，& 上一个 1 就返回了该位
  // & 运算符返回的是运算符后面那个数的二进制位数 1 是一位, 11 是两位
  return (number >> bitPosition) & 1;
}

module.exports = getBit;