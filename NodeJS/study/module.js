const path = require('path')
const fs = require('fs')
const vm = require('vm')


function Module(id = '', parent) {
  this.id = id
  // 父级路径 ..
  this.path = path.dirname(id)
  this.exports = {}
  this.parent = parent
  this.filename = null
  this.loaded = false
  this.children = []
}

function myRequire(filePath) {
  return Module.prototype.require(filePath)
}

Module.warp = function(script) {
  let arr = [
    '(function(exports, require, module, __filename, __dirname) {',
    script,
    '})'
  ]
  return arr.join('')
}

Module._extensions = {
  '.js': function(module, filename) {
    // 读取文件内容 - 字符串
    const content = fs.readFileSync(filename, 'utf8')
    // 调用包装方法将字符串包装成函数字符串
    const wrapper = Module.warp(content)
    const compiledWrapper = vm.runInThisContext(wrapper)
    // 准备要传入的参数
    const exports = module.exports
    const thisValue = exports
    const require = myRequire
    const dirname = path.dirname(filename)
    // 执行函数返回结果
    compiledWrapper.call(thisValue, exports, require, module, filename, dirname)
  },
  '.json': function(module, filename) {
    // 读取文件内容 - 字符串
    const content = fs.readFileSync(filename, 'utf8')

    // 转化为对象赋值到  module.exports 上
    module.exports = JSON.parse(content)
  }
}

Module._resolveFilename = function(require) {
  const filePath = path.resolve(__dirname, require)
  const exists = fs.existsSync(filePath)
  if (exists) {
    return filePath
  }

  let keys = Object.keys(Module._extensions)
  for (let i = 0; i < keys.length; i++) {
    const currentPath = filePath + keys[i]
    if (fs.existsSync(currentPath)) {
      return currentPath
    }
  }
}

Module.prototype.load = function(fileName) {
  // const extension = findLongestRegisteredExtension(filename);
  const extension = path.extname(fileName)
  Module._extensions[extension](this, fileName)
}

Module._cache = {}

Module._load = function(request, parent, isMain) {
  // 解析绝对路径
  const fileName = Module._resolveFilename(request, parent, isMain)

  // 查找是否有模块缓存
  const cachedModule = Module._cache[fileName]
  if (cachedModule !== undefined) {
    // 返回缓存内容
    return cachedModule.exports
  }

  const module = new Module(fileName, parent)
  // 将模块置入缓存
  Module._cache[fileName] = module

  module.load(fileName)
  return module.exports
}

Module.prototype.require = function(id) {
  return Module._load(id, this, false)
}

let r = myRequire('./test.js')
myRequire('./test.js')
myRequire('./test.js')
console.log(r)
