var freeGlobal = require('./_freeGlobal')
var newFreeGlobal = require('./_newFreeGlobal')

var freeSelf = typeof self == 'object' && self && self.Object === Object && self

/** 用作对全局对象的引用 */
var root = newFreeGlobal || freeGlobal || freeSelf || Function('return this')()

module.exports = root