/* `Number` 常量的引用 */
var MAX_SAFE_INTEGER = 9007199254740991

/* 匹配无符号整数值 */
var reIsUint = /^(?:0|[1-9]\d*)$/

/**
 * 检查 `value` 是否符合类数组的下标
 * 
 * @param {*} value 要检查的值
 * @param {number} [length=MAX_SAFE_INTEGER] 有效的索引上限
 * @returns {boolean}
 */

function isIndex(value, length) {
  var type = typeof value
  length = length == null ? MAX_SAFE_INTEGER : length

  return !!length &&
    (type == 'number' || (type != 'symbol' && reIsUint.test(value))) &&
    (value > -1 && value % 1 == 0 && value < length)

}

module.exports = isIndex

/**
 * @study
 *
 * !!
 * 将 `value` 转换为布尔值
 * 但实际上js会自动转换
 * 类似于调用 ToBoolean(value)
 */