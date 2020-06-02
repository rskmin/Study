/**
 * 判断是否为一个对象(简单类型检查)
 * 
 * @param {*} value 要检查的数据
 * @return {boolean} 返回值为 `true` 则传入数据为对象
 */

function isObject(value) {
  var type = typeof value
  return (value != null) && (type == 'object' || type == 'function')
}

module.exports = isObject