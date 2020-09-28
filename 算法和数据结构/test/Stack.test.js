/* eslint-disable no-undef */
const { assert } = require('chai')
const Stack = require('../stack/Stack')
const LinkList = require('../linkList/LinkList')

function createStack() {
  return new Stack()
}

describe('Stack', () => {
  it('push and pop', () => {
    const stack = createStack()
    const arr = [1, 2, 3, 4, 5]
    arr.forEach(item => {
      stack.push(item)
    })
    arr.reverse().forEach(item => {
      assert.equal(stack.pop(item).element, item)
    })
  })
})