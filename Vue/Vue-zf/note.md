# Vue 源码构建

- Vue是一个什么样的框架
  - 借鉴了MVVM(数据变化会更新视图，视图便会会影响数据)的框架
  - MVVM不可以跳过数据操作DOM，但Vue可以($ref)

## Vue2

### rollup环境配置

```bash
yarn add rollup rollup-plugin-babel @babel/core @babel/preset-env rollup-plugin-serve -D
```

- rollup: js打包工具
- rollup-plugin-babel: 与babel的关联插件
- @babel/core: babel核心模块
- @babel/preset-env: babel预设插件，供给核心模块调用
- rollup-plugin-serve: 服务插件
- 配置文件

```js
// rollup.config.js
import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'

export default {
  input: './src/index.js', // 入口
  output: {
    format: 'umd', // 模块化的类型
    name: 'Vue', // 全局变量的名字
    file: 'dist/umd/vue.js',
    sourcemap: true
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    serve({
      port: 3000,
      contentBase: '',
      openPage: '/index.html'
    })
  ]
}
```

### 构建过程

#### 初始化Vue

```js
// 构造函数形式方便拆分，class是一体化思想
function Vue(options) {
  // 初始化Vue
  this._init(options)
}

// 通过插件的方式对Vue进行扩展
initMixin(Vue)
```

```js
export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this // Vue实例别名
    vm.$options = options // 挂载配置选项
  }
}
```

- 状态初始化

```js
export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this
    vm.$options = options

    // 初始化状态(数据劫持，当数据改变时更新视图)
    initState(vm)
  }
}
```

```js
export function initState(vm) {
  const opts = vm.$options
  if (opts.props) {
    initProps(vm)
  }
  if (opts.methods) {
    initMethods(vm)
  }
  if (opts.data) {
    initData(vm)
  }
  if (opts.computed) {
    initComputed(vm)
  }
  if (opts.watch) {
    initWatch(vm)
  }
}

function initProps() {}
function initMethods() {}
function initData(vm) {
  let data = vm.$options.data
}
function initComputed() {}
```

## Vue3

## 差异

- Vue2默认全部劫持(完全递归) Vue3用到再劫持(懒递归)
  - Vue2针对性优化
    - 层次不能太深，扁平化
    - 使用Object.freeze()冻结深层无需响应的数据