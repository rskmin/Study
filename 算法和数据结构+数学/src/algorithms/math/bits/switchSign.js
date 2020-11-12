/**
 * 切换符号 - 取反
 * @param {number} number 十进制整数
 * @returns {number}
 */
function switchSign(number) {
  // 各个二进制位取反后 +1
  return ~number + 1;
}

module.exports = switchSign;