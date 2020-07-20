/* eslint-disable no-invalid-this */
const proto = module.exports = { // this -> ctx
}

function defineGetter(target, keys) {
  keys.forEach(key => {
    proto.__defineGetter__(key, function () {
      return this[target][key]
    })
  })
}

function defineSetter(target, keys) {
  keys.forEach(key => {
    proto.__defineSetter__(key, function (value) {
      this[target][key] = value
    })
  })
}

defineGetter('request', [
  'url',
  'path',
  'query'
])

defineGetter('response', [
  'body'
])

defineSetter('response', [
  'body'
])