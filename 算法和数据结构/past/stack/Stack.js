const LinkList = require('../linkList/LinkList')

class Stack {
  constructor() {
    this.ll = new LinkList()
  }
  push(element) {
    this.ll.add(element)
  }
  pop() {
    return this.ll.remove(this.ll.size - 1)
  }
}

module.exports = Stack

function one() {
  function two() {
    function three() {
      console.log('three')
    }
    three()
  }
  two()
}
debugger
one()