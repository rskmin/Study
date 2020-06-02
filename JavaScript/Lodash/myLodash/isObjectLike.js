/**
 * 检查值是否为类对象， 类对象具有 `typeof` 为 "object" 并且不为 `null`
 * 
 * @memberOf _
 * @category Lang 
 * @param {*} value 要检查的值
 * @returns {boolean} 若为类对象则返回 `true`
 * 
 */

 function isObjectLike(value) {
   return value != null && typeof value == 'object'
 }


 module.exports = isObjectLike