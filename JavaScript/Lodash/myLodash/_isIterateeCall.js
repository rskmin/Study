var eq = require('./eq'),
  isArrayLike = require('./isArrayLike'),
  isIndex = require('./_isIndex'),
  isObject = require('./isObject')

/**
 * 检查给定的参数是否来自迭代调用
 * 
 * @param {*} value 潜在迭代参数值
 * @param {*} index 潜在迭代的下标或键值
 * @param {*} object 潜在迭代对象参数
 * @return {boolean} 如果 参数来自迭代调用则返回 `true`
 * 
 */

function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false
  }
  var type = typeof index
  if (type == 'number'
    ? (isArrayLike(object) && isIndex(index, object.length))
    : (type == 'string' && index in object)
  ) {
    return eq(object[index], value)
  }
  return false
}

module.exports = isIterateeCall

