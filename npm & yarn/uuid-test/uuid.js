const { v4 } = require('uuid')

// 去短横线用法
console.log(v4().split('-').join(''))