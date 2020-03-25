// 创建一个TemplateComplier模板编译工具
class TemplateCompiler {
  // 构造函数
  // 1)视图线索
  // 2)全局vm对象
  constructor(el, vm) {
    // 缓存重要属性
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    this.vm = vm
    // 判断视图存在
    if (this.el) {
      // 把模板内容放入内存, 获取所需片段
      let fragment = this.node2fragment(this.el)
      // 解析模板
      this.compile(fragment)
      // 把内存的结果，返回到页面
      this.el.appendChild(fragment)

    }


    // 判断视图存在
    // 1. 把模板内容放入内存（片段）
    // let frgment = this.node2fragment(el)
    // 2. 解析模板
    //  this.compile(fragment)
    // 3. 把内存的结果，返回到页面中
    //  el.appendChild(fragment)

  }

  //********************工具方法****************** */
  isElementNode(node) {
    return node.nodeType === 1
  }
  isTextNode(node) {
    return node.nodeType === 3
  }
  toArray(fakeArr) {
    // return [].slice.call(fakeArr)
    return Array.from(fakeArr)
  }
  isDirective(attrName) { // v-text
    const regular = /^v-/
    return regular.test(attrName)
  }
  //********************************************* */
  // 把模板放入内存，等待解析
  node2fragment(node) {
    // 1. 创建内存片段
    let fragment = document.createDocumentFragment(), child
    // 2. 把模板内容丢到内存
    while (child = node.firstChild) {
      fragment.appendChild(child)
    }

    // 3. 返回
    return fragment
  }
  compile(parent) {
    // 获取子节点
    let childNodes = parent.childNodes,
      compiler = this
    // 遍历每一个节点
    this.toArray(childNodes).forEach(node => {
      // 判断节点类型
      if (compiler.isElementNode(node)) {
        // 元素节点
        compiler.compileElement(node)
      } else if (compiler.isTextNode(node)) {
        // 文本节点
        let textReg = /\{\{(.+)\}\}/
        let expr = node.textContent
        // 按照规则验证内容
        if (textReg.test(expr)) {
          expr = RegExp.$1
          // 调用方法编译
          this.compileText(node, expr.trim())
        }
      }

      // 如果还有子节点继续解析
    })
  }
  // 解析元素节点的指令
  compileElement(node) {
    // 获取当前元素节点的所有属性
    let arrs = node.attributes,
      compiler = this
    // 遍历当前元素的所有属性
    this.toArray(arrs).forEach(attr => {
      let attrName = attr.name
      // 判断属性是否是指令
      if (compiler.isDirective(attrName)) {
        // 收集
        // 指令类型
        // let type = attrName.split("-")[1]
        let type = attrName.substr(2)
        // 指令的值就是表达式
        let expr = attr.value
        // 找帮手
        CompilerUtils[type](node, compiler.vm, expr)

      }
    })
  }
  // 解析表达式的
  compileText(node, expr) {
    CompilerUtils.text(node, this.vm, expr)
  }


  //***********************核心方法************** */
}

// 帮手
CompilerUtils = {
  // 解析text指令
  text(node, vm, expr) {
    // 找到跟新方法
    let updateFn = this.updater['textUpdater']
    // 执行方法
    updateFn && updateFn(node, vm.$data[expr])

    /* 第n+1次 */
    // 1) 需要使用订阅功能的节点
    // 2) 全局vm对象，用于获取数据
    // 3) 发布时需要做的事情
    new Watcher(vm, expr, newValue => {
      // 触发订阅时，按照之前的规则，对节点进行更新
      updateFn && updateFn(node, newValue)
    })
  },
  model(node, vm, expr) {
    // 找到跟新方法
    let updateFn = this.updater['modelUpdater']
    // 执行方法
    updateFn && updateFn(node, vm.$data[expr])

    // 给model指令也添加订阅者
    new Watcher(vm, expr, newValue => {
      // 触发订阅时，按照之前的规则，对节点进行更新
      updateFn && updateFn(node, newValue)
    })

    // 视图到模型
    node.addEventListener('input', e => {
      // 获取输入框的新值
      let newValue = e.target.value

      // 把值放入到数据
      vm.$data[expr] = newValue
    })
  },

  // 跟新规则对象
  updater: {
    // 文本跟新方法
    textUpdater(node, value) {
      node.textContent = value
    },
    // 输入框跟新方法
    modelUpdater(node, value) {
      node.value = value
    }
  }
}