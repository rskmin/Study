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
    while (currentNode) {
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
  preorderTraversal(visitor) {// 前序遍历
    const traversal = (node) => {
      if (node == null) return
      visitor.visit(node.element)// 访问者接口
      traversal(node.left)
      traversal(node.right)
    }
    traversal(this.root)
  }
  inorderTraversal(visitor) {// 中序遍历
    const traversal = node => {
      if (node == null) return
      traversal(node.left)
      visitor.visit(node.element)
      traversal(node.right)
    }
    traversal(this.root)
  }
  postorderTraversal(visitor) {// 后序遍历
    const traversal = node => {
      if (node == null) return
      traversal(node.left)
      traversal(node.right)
      visitor.visit(node.element)
    }
    traversal(this.root)
  }
  invertTree() {// REVIEW:反转二叉树
    const traversal = node => {
      if (node == null) return node
      ;[node.left, node.right] = [traversal(node.right), traversal(node.left)]
      return node
    }
    return traversal(this.root)
  }
  levelOrderTraversal(visitor) {// 层序遍历
    if (this.root == null) return
    const stack = [this.root]
    let index = 0
    let currentNode
    while (currentNode = stack[index++]) {
      visitor.visit(currentNode.element)
      if (currentNode.left) {
        stack.push(currentNode.left)
      }
      if (currentNode.right) {
        stack.push(currentNode.right)
      }
    }
  }
}

let bst = new BST((a, b) => a - b)
let arr = [10, 8, 19, 6, 15, 22, 20]
arr.forEach(item => bst.add(item));
// console.dir(bst.root, {
//   depth: 1000
// })

// 访问者
class Visitor {
  visit(element) {
    console.log(element)
  }
}

let visitor = new Visitor()
// bst.postorderTraversal(visitor)

// console.log(bst.invertTree())
bst.levelOrderTraversal(visitor)

module.exports = BST