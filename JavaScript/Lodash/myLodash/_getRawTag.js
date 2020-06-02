var Symbol = require('./_Symbol')

/* 内置方法的引用 */
var objectProto = Object.prototype

/** 
 * 检查对象是否有指定属性(原生方法)
 * @returns {boolean}
 * */
var hasOwnProperty = objectProto.hasOwnProperty

/**
* 原生的 Object.prototype.toString() 
* @returns {string} `[object ${调用对象类型}]` - 类型标签
*/
var nativeObjectToString = objectProto.toString

/**
* 内置值的引用 
* 
* Symbol.toStringTag 是一个内置 symbol, 它通常作为对象的属性键使用
*/
var symToStringTag = Symbol ? Symbol.toStringTag : undefined

/**
 * 检查传入值类型的标签
 * 
 * 一个不同于 `baseGetTag` 的特殊版本(增加检查 Symbol.toStringTag 标签) ??????
 * 
 * @param {*} value 要查询的值
 * @returns {string} 返回该值的类型标签
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag]

  try {
    value[symToStringTag] = undefined
    var unmasked = true
  } catch (e) {}

  var result = nativeObjectToString.call(value)
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag
    } else {
      delete value[symToStringTag]
    }
  }
  return result
}


module.exports = getRawTag

