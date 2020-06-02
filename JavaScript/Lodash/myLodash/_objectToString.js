/* 内置方法的引用 */
var objectProto = Object.prototype

var nativeObjectToString = objectProto.toString

/**
 * 使用 `Object.prototype.toString` 获取值的标签
 * 
 * @param {*} value
 * @returns {string} 返回值的标签
 */

 function objectToString(value) {
   return nativeObjectToString.call(value)
 }

 module.exports = objectToString