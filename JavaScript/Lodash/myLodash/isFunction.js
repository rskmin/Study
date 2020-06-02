var baseGetTag = require('./_baseGetTag'),
  isObject = require('./isObject')

/* `Object#toString` 结果的引用 */
var asyncTag = '[object AsyncFunction]',
  funcTag = '[object Function]',
  genTag = '[object GeneratorFunction]',
  proxyTag = '[object Proxy]'

/**
 * 检查 `value` 是不是 `Function` 类型对象
 * 
 * @memberOf _
 * @category Lang
 * @param {*} value 要检查的值
 * @returns {boolean} 如果 `value` 为 `Function` 类型对象则返回 `true`
 * 
 */

function isFunction(value) {
  if(!isObject(value)) {
    return false
  }
  var tag = baseGetTag(value)
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag
}

module.exports = isFunction