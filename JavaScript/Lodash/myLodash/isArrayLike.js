var isFunction = require('./isFunction'),
  isLength = require('./isLength')

/**
 * 检查 `value` 是不是一个类数组
 * 类数组的定义是：不是一个方法并且拥有 `value.length` 大于等于 `0`
 * 且 小于等于 `Number.MAX_SAFE_INTEGER`
 * 
 * 
 * @memberOf _
 * @category Lang
 * @param {*} value 要检查的参数
 * @return {boolean} 如果 `value` 为类数组则返回
 */

function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value)
}

module.exports = isArrayLike