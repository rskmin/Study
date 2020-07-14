// 树节点
class Node {
  constructor(element, parent) {
    this.parent = parent
    this.element = element
    this.left = null
    this.right = null
  }
}

// 二叉搜索树
class BST {// binary search tree
  constructor(compare) {
    this.root = null
    this.size = 0
    this.compare = compare || this.compare
  }
  compare(a, b) {
    return a - b
  }
  add(element) {
    if (this.root == null) {// 设置根节点
      this.root = new Node(element, null)
      this.size++
      return
    }
    // 获取根节点 用当前添加的进行判断 是添加在左边还是右边
    let currentNode = this.root
    let parent = null
    let compare
    while(currentNode) {
      compare = this.compare(element, currentNode.element)
      parent = currentNode
      if (compare > 0) {
        currentNode = currentNode.right
      } else if (compare < 0) {
        currentNode = currentNode.left
      } else {
        currentNode.element = element
      }
    }
    let newNode = new Node(element, parent)
    if (compare > 0) {
      parent.right = newNode
    } else if (compare < 0) {
      parent.left = newNode
    }
    this.size++
  }
}

let bst = new BST((a, b) => b - a)
let arr = [10, 8, 19, 6, 15, 22, 20]
arr.forEach(item => bst.add(item));
console.dir(bst.root, {
  depth: 1000
})