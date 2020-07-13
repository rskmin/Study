// 链表反转

const LinkList = require('./LinkList')

let ll = new LinkList()

ll.add(1)
ll.add(2)
ll.add(3)
ll.add(4)
console.dir(ll, {
  depth: 1000
})

ll.reverse()