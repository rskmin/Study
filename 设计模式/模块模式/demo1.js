let Module = (function() {

  let counter = 0

  return {

    incrementCounter: function() {
      return counter++
    },

    resetCounter: function() {
      counter = 0
    }

  }
})()

console.log(Module.incrementCounter())
console.log(Module.incrementCounter())

Module.resetCounter()

console.log(Module.incrementCounter())
