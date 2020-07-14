/* eslint-disable no-undef */
const { assert } = require('chai')
const LinkList = require('../链表/LinkList')

const linkArr = [1, 2, 3, 4]

function getNumberInAddRanger(linkList) {
  const number = Math.floor(Math.random() * (linkList.size + 1))
  getNumberInAddRanger.number = number
  return number
}

function getNumberInRemoveRanger(linkList) {
  const number = Math.floor(Math.random() * linkList.size)
  getNumberInRemoveRanger.number = number
  return number
}

function getNumber(range) {
  const number = Math.random() * range
  getNumber.number = number
  return number
}

/**
 * @return {LinkList}
 */
function createLinkList() {
  let ll = new LinkList()
  linkArr.forEach(item => {
    ll.add(item)
  })
  return ll
}
describe('LinkList', () => {
  it('create', () => {// 链表创建测试
    let currentHead = createLinkList().head
    linkArr.forEach(act => {
      assert.equal(currentHead.element, act)
      currentHead = currentHead.next
    })
  })

  it('get', () => {// 链表元素获取测试
    let ll = createLinkList()
    linkArr.forEach((item, index) => {
      assert.equal(ll.get(index).element, item)
    })
  })

  it('add', () => {// 链表添加测试
    let ll = createLinkList()
    // 索引溢出测试
    try {
      for (let i = 0; i < 100; i++) {
        ll.add(getNumber(100), getNumber.number)
        assert.equal(ll.get(getNumber.number).element, getNumber.number)
      }
    } catch (e) {
      assert.equal(e.message, '索引错误')
    }

    // 正确添加测试
    for (let i = 0; i < 100; i++) {
      ll.add(getNumberInAddRanger(ll), getNumber(100))
      assert.equal(ll.get(getNumberInAddRanger.number).element, getNumber.number)
    }

  })

  it('remove', () => {
    const ll = createLinkList()
    for (let i = 0, len = ll.size; i < len; i++) {
      getNumberInRemoveRanger(ll)
      ll.remove(getNumberInRemoveRanger.number)
    }
    assert.equal(ll.head, null)
  })

  it('reverse', () => {// 链表递归反转测试
    let currentHead = createLinkList().reverse()
    linkArr.reverse().forEach(act => {
      assert.equal(currentHead.element, act)
      currentHead = currentHead.next
    })
  })

  it('reverseLoop', () => {// 链表循环反转测试
    let currentHead = createLinkList().reverseLoop()
    linkArr.reverse().forEach(act => {
      assert.equal(currentHead.element, act)
      currentHead = currentHead.next
    })
  })
})