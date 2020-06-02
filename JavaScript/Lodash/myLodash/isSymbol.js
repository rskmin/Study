var baseGetTag = require("./_baseGetTag"),
  isObjectLike = require("./isObjectLike")

/* `Object#toString` 结果的引用 */
var symbolTag = '[object Symbol]'

/**
 * 检查 `value` 是不是 `Symbol` 原语或对象
 * 
 * @memberOf _
 * @category Lang
 * @param {*} value 要检查的值
 * @returns {boolean} 若为 symbol 则返回 `true`
 * @example
 * 
 * _.isSymbol(Symbol.iterator)
 * 
 */
function isSymbol(value) {
  return typeof value == 'symbol' || 
    (isObjectLike(value) && baseGetTag(value) == symbolTag)
}

module.exports = isSymbol

 /**
  * @STUDY
  * 
  * Symbol.iterator 为有迭代器对象的唯一迭代器属性
  * Array.prototype[Symbol.iterator]
  * 获得一个函数，该函数返回该数组的迭代器
  */

