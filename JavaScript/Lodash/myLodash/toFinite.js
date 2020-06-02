var toNumber = require('./toNumber')

/* `Number` 常数得引用 */
var INFINITY = 1 / 0,// Infinity
  MAX_INTEGER = 1.7976931348623157e+308// Number.MAX_VALUE

/**
 * 将 `value` 转化为有限数字
 * 
 * @memberOf _
 * @category Lang
 * @param {*} value 要转换的数字
 * @returns {number} 返回转换好得值
 * 
 */

 function toFinite(value) {
   if(!value) {
     return value === 0 ? value : 0
   }
   value = toNumber(value)
   if (value === INFINITY || value === -INFINITY) {
     var sign = (value < 0 ? -1 : 1)
     return sign * MAX_INTEGER
   }
   return value === value ? value : 0
 }

 module.exports = toFinite