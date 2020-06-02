/**
 * 判定两个值是否相等
 * 
 * @menberOf _
 * @category Lang
 * @param {*} 要比较的值
 * @param {*} 另一个要比较的值
 * @returns {boolean} 如果两个值相等则返回 `true`
 */

function eq(value, other) {
  return value === other || (value !== value && other !== other)
}

module.exports = eq