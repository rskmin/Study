/**
 * 检测 Node.js 全局变量 global 是否正常
 */

 var freeGlobal = (typeof global == 'object') && global && (global.Object === Object) && global

 module.exports = freeGlobal