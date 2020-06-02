var toFinite = require('./toFinite')

/**
 * 将 `value` 转化为整数
 * 
 * @memberOf _
 * @category Lang
 * @param {*} value 要转换的值
 * @returns {number} 返回转换完的整数
 */

function toInteger(value) {
  var result = toFinite(value),
    remainder = result % 1
  // NaN === NaN (false)
  return result === result ? (remainder ? result - remainder : result) : 0
}

module.exports = toInteger