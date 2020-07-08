const path = require('path')
const fs = require('fs')
const vm = require('vm')


function Module() { }

Module._extensions = {
  '.js': function() {},
  '.json': function() {}
}
Module._resolveFilename = function(require) {
  const filePath = path.resolve(__dirname, require)
  const exists = fs.existsSync(filePath)
  if (exists) {
    return filePath
  }

  let keys = Object.keys(Module._extensions)
  for (let i = 0; i < keys.length; i++) {
    let currentPath = filePath + keys[i]
  }
}

Module._load = function(request, parent, isMain) {
  // 解析绝对路径
  const fileName = Module._resolveFilename(request, parent, isMain)
  // return module.exports
}

Module.prototype.require = function(id) {
  return Module._load(id, this, false)
}

let r = Module.prototype.require.call(this, './test.js')
console.log(r)
