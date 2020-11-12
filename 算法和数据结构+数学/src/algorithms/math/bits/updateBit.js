/**
 * 更新十进制数指定二进制位上的值
 * @param {number} number 十进制整数
 * @param {number} bitPosition 二进制位下标
 * @param {0|1} bitValue 二进制值
 * @returns {number}
 */
function updateBit(number, bitPosition, bitValue) {
  const bitValueNormalized = bitValue ? 1 : 0;
  const clearMask = ~(1 << bitPosition);
  return (number & clearMask) | (bitValueNormalized << bitPosition);
}

module.exports = updateBit;