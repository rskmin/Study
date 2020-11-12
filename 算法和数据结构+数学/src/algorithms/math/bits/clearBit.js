/**
 * 设置一个十进制数指定二进制位上的值为0
 * @param {number} number 十进制整数
 * @param {number} bitPosition 二进制位
 * @return {number}
 */
function clearBit(number, bitPosition) {
  // ~(1 << 2) = 011
  const mask = ~(1 << bitPosition);
  // 11101 & 011 = 11001
  return number & mask;
}

module.exports = clearBit;