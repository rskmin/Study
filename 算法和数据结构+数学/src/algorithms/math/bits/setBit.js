/**
 * 设置一个十进制数指定二进制位上的值为1
 * @param {number} number 十进制数
 * @param {number} bitPosition 二进制位
 * @return {number}
 */
function setBit(number, bitPosition) {
  // 1 << 2 = 100
  // 11001 | 100 = 11101
  return number | (1 << bitPosition);
}

module.exports = setBit;