var isObject = require("./isObject"),
  isSymbol = require('./isSymbol')

/* 常量的引用 */
var NAN = 0 / 0

/* 匹配前后空白符 */
var reTrim = /^\s+|\s+$/g

/* 检查不好的十六进制字符串写法 */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i

/* 匹配二进制字符串值 */
var reIsBinary = /^0b[01]+$/i

/* 匹配八进制字符串 */
var reIsOctal = /^0o[0-7]+$/i

/* 内置方法的引用，不依赖于 `root` */
var freePareInt = parseInt

/**
 * 转变一个值为 `number`
 * 
 * @memberOf _
 * @category Lang
 * @param {*} value 要处理的数值
 * @returns {number} 返回的数字
 */
function toNumber(value) {
  if (typeof value == 'number') {// 数字直接返回
    return value
  }
  if (isSymbol(value)) {// symbol 类型返回非数字
    return NAN
  }
  if (isObject(value)) {// 对象类型 获取对象中的基本数据类型值
    var other = typeof value.valuOf == 'function' ? value.valueOf() : value
    // 如果未获取基本数据类型则强行转化未基本数据类型
    value = isObject(other) ? (other + '') : other
  }
  if(typeof value != 'string') {
    return value === 0 ? value : +value
  }
  // 删除字符串中的空格符
  value = value.replace(reTrim, '')
  // 判断是否是二进制字符串
  var isBinary = reIsBinary.test(value)
  // 将二八进制字符串转化为10进制数字返回，若
  return (isBinary || reIsOctal.test(value))
   ? freePareInt(value.slice(2), isBinary ? 2 : 8)
   : (reIsBadHex.test(value) ? NAN : +value)

}

module.exports = toNumber

/**
 * @study
 * //i
 * i 不区分大小写
 * 
 * 一元正号（+）
 * 一元正号运算符位于其操作数前面，计算其操作数的数值，
 * 如果操作数不是一个数值，会尝试将其转换成一个数值
 * 如果它不能解析一个值，则计算结果为 NaN
 * 一元正号是转换其他对象到数值的最快方法，也是最推荐的做法，因为它不会对数值执行任何多余操作
 */