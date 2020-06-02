/**
 * 检测 Node.js 全局变量 globalThis 是否正常
 */

 var newFreeGlobal = (typeof globalThis == 'object') && globalThis && (globalThis.Object === Object) && globalThis

 module.exports = newFreeGlobal