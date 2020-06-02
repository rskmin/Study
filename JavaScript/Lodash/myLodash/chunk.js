var baseSlice = require('./_baseSlice'),
  isIterateeCall = require('./_isIterateeCall'),
  toInteger = require('./toInteger')

/* 内置方法引用 */
var nativeCeil = Math.ceil, // Math.ceil() 返回大于或等于一个给定数字的最小整数
  nativeMax = Math.max // Math.max() 返回一组数中的最大值

/**
 * 将数组（array）拆分成多个 size 长度的区块，并将这些区块组成一个新数组。
 * 如果array 无法被分割成全部等长的区块，那么最后剩余的元素将组成一个区块
 * 
 * @memberOf _
 * @category Array
 * @param {Array} array 要处理的数组
 * @param {number} [size=1] 每一组的长度
 * @param {Object} [guard] 允许将`_.map这样的方法用作迭代`
 * @returns {Array} 返回分割好的数组
 * 
 */

function chunk(array, size, guard) {
  if((guard ? isIterateeCall(array, size, guard) : size === undefined)) {
    size = 1
  } else {
    size = nativeMax(toInteger(size), 0)
  }
  var length = (array == null) ? 0 : array.length
  if (!length || size < 1) {
    return []
  }
  var index = 0,
    resIndex = 0,
    result = Array(nativeCeil(length / size))

  while (index < length) {
    result[resIndex++] = baseSlice(array, index, (index += size))
  }
  return result
}

module.exports = chunk