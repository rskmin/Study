/* `Number` 常量的引用 */
var MAX_SAFE_INTEGER = 9007199254740991

/**
 * 检查 `value` 是否为有效的类数组长度
 * 
 * @memberOf _
 * @category Lang
 * @param {*} value 要检查的值
 * @returns {boolean} 如果长度有效则返回 `true`
 * 
 */

function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER
}

module.exports = isLength