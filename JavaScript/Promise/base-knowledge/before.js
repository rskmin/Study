/* eslint-disable no-extend-native */
function say(a, b, c, d) {
  console.log('说话', a, b, c, d)
}

Function.prototype.before = function(callback) {
  return (...args) => {
    callback()
    this(...args)
  }
}

let newSay = say.before(() => {
  console.log('说话前')
})

newSay(1, 2, 3, 4)
