var Symbol = require('./_Symbol'),
  getRawTag = require('./_getRawTag'),
  objectToString = require('./_objectToString')

/* `Object#toString` 结果的引用 */
var nullTag = '[object Null]',
  undefinedTag = '[object Undefined]'

/* 内置值的引用 */
var symToStringTag = Symbol ? Symbol.symToStringTag : undefined

/**
 * @param {*} value 要查询的值
 * @returns {string} 返回 `toStringTag`
 */

 function baseGetTag(value) {
   if (value == null) {
     return value === undefined ? undefinedTag : nullTag
   }
   return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value)
 }
 
 module.exports = baseGetTag