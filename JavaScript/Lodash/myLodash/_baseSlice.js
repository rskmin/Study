/**  
* Array.prototype.slice()的基础实现(不完全一样)
*
* @param {Array} array 要切片的数组
* @param {number} [start=0] 起始下标
* @param {number} [end=array.length] 结束下标
* @returns {Array} 切好的数组
 */

function baseSlice(array, start, end) {
  var index = -1,
    length = array.length

  if (start < 0) {
    // 若绝对值超出数组长度则置0，否侧从尾部开始
    start = (-start > length) ? 0 : (length + start)
  }
  // 判断结束下标是否超出数组长度
  end = (end > length) ? length : end
  if (end < 0) {
    end += length
  }
  length = (start > end) ? 0 : ((end - start) >>> 0)
  start >>>= 0

  var result = Array(length)
  while (++index < length) {
    result[index] = array[index + start]
  }
  return result

}

module.exports = baseSlice

/* 
* TEST
 */
// var array = [1,2,3,4]
// console.log(baseSlice(array, -3, 2))

/**
 * STUDY
 */
/**
* @about >>>
* >>> 无符号位右移
* >>> 0 它不仅将非数字转换为数字，还将它们转换为可以表示为32位无符号的数字 `Unit32`
* 即操作符在移位前做了两种转换:
* 1.将不是 `number` 类型的数据转换为 `number`
* 2.将 `number` 转化为无符号的 `32bit` 数据
*
* `Unit32`类型转换方法
* 1.如果不能转换为 `number` 就为0
* 2.如果为非整数，先转换为整数，同 (x < 0) ? Math.ceil(x) : Math.floor(x)
* 3.如果是正数，返回该数；如果是负数，返回该数+Math.pow(2, 32)
*/