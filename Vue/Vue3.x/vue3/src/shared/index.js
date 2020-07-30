/* eslint-disable no-self-compare */
/**
 * 判断是否是对象
 * @param {*} val - 目标对象
 * @returns {boolean}
 */
export const isObject = val => val !== null && typeof val === 'object'

const hasOwnProperty = Object.prototype.hasOwnProperty
/**
 * 判断对象上是否存在某个属性
 * @param {object} val - 目标对象
 * @param {*} key - 目标属性
 */
export const hasOwn = (val, key) => hasOwnProperty.call(val, key)

/**
 * 比较数值是否改变, 包括比较NaN
 * @param {*} value - 原值
 * @param {*} oldValue - 旧值
 */
export const hasChanged = (value, oldValue) =>
  value !== oldValue && (value === value || oldValue === oldValue)