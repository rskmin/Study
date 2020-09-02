(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  // 获取数组原型上的方法
  var oldArrayProtoMethods = Array.prototype; // 继承方法

  var arrayMethods = Object.create(oldArrayProtoMethods);
  var methods = ['push', 'pop', 'shift', 'unshift', 'reverse', 'sort', 'split'];
  methods.forEach(function (methods) {
    arrayMethods[methods] = function () {
      console.log('数组方法被调用了');

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var result = oldArrayProtoMethods[methods].apply(this, args);
      var inserted;
      var ob = this.__ob__;

      switch (methods) {
        case 'push':
        case 'unshift':
          inserted = args;
          break;

        case 'slice':
          inserted = args.slice(2);
          break;
      }

      if (inserted) ob.observeArray(inserted);
      return result;
    };
  });

  /* eslint-disable no-prototype-builtins */
  function proxy(vm, data, key) {
    Object.defineProperty(vm, key, {
      get: function get() {
        return vm[data][key];
      },
      set: function set(newValue) {
        vm[data][key] = newValue;
      }
    });
  }
  function defineProperty(target, key, value) {
    Object.defineProperty(target, key, {
      enumerable: false,
      configurable: false,
      value: value
    });
  }
  var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestory', 'destoryed'];
  var strats = {};

  strats.data = function (parentVal, childVal) {
    return childVal;
  };

  strats.computed = function () {};

  strats.watch = function () {};

  function mergeHook(parentVal, childVal) {
    if (childVal) {
      if (parentVal) {
        return parentVal.concat(childVal);
      }

      return [childVal];
    } // 没有儿子, 不合并


    return parentVal;
  }

  LIFECYCLE_HOOKS.forEach(function (hook) {
    strats[hook] = mergeHook;
  });
  function mergeOptions(parent, child) {
    var options = {};

    for (var key in parent) {
      // 父亲和儿子都有的
      mergeField(key);
    }

    for (var _key in child) {
      // 父亲没有儿子有
      if (!parent.hasOwnProperty(_key)) {
        mergeField(_key);
      }
    }

    function mergeField(key) {
      // 合并字段
      if (strats[key]) {
        options[key] = strats[key](parent[key], child[key]);
      } else {
        // 默认合并
        options[key] = child[key];
      }
    }

    return options;
  }

  var Dep = /*#__PURE__*/function () {
    function Dep() {
      _classCallCheck(this, Dep);

      this.subs = [];
    }

    _createClass(Dep, [{
      key: "depend",
      value: function depend() {
        this.subs.push(Dep.target);
      }
    }, {
      key: "notify",
      value: function notify() {
        this.subs.forEach(function (watcher) {
          return watcher.update();
        });
      }
    }]);

    return Dep;
  }();

  Dep.target = null;
  function pushTarget(watcher) {
    Dep.target = watcher;
  }
  function popTarget() {
    Dep.target = null;
  }

  /**
   * 劫持对象
   * @param {object} data
   * @param {*} key
   * @param {*} value
   */

  function defineReactive(data, key, value) {
    observe(value); // 递归劫持

    var dep = new Dep(); // 每个属性都有一个dep

    Object.defineProperty(data, key, {
      get: function get() {
        if (Dep.target) {
          dep.depend();
        }

        return value;
      },
      set: function set(newValue) {
        if (newValue == value) return;
        observe(newValue); // 如果新值是个对象也要拦截

        value = newValue;
        dep.notify();
      }
    });
  }
  /**
   * 封装对属性进行观测的类
   */


  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);

      // 判断一个对象是否被观测过可以查看有没有没 __ob__
      defineProperty(value, '__ob__', this); // 使用 defineProperty 重新定义属性

      if (Array.isArray(value)) {
        // 数组函数劫持(切片编程)
        Object.setPrototypeOf(value, arrayMethods);
        this.observeArray(value); // 观测数组中的对象类型
      } else {
        // 对象属性劫持
        this.walk(value);
      }
    }

    _createClass(Observer, [{
      key: "observeArray",
      value: function observeArray(value) {
        value.forEach(function (item) {
          return observe(item);
        });
      }
    }, {
      key: "walk",
      value: function walk(data) {
        var keys = Object.keys(data);
        keys.forEach(function (key) {
          // 定义成响应数据
          defineReactive(data, key, data[key]);
        });
      }
    }]);

    return Observer;
  }();

  function observe(data) {
    if (_typeof(data) !== 'object' && data !== null) {
      // 确保必须是对象
      return data;
    }

    if (data.__ob__) {
      return data;
    }

    return new Observer(data);
  }

  function initData(vm) {
    var data = vm.$options.data;
    vm._data = data = typeof data == 'function' ? data.call(vm) : data; // 将data的属性代理到vm上

    for (var key in data) {
      proxy(vm, '_data', key);
    } // 数据的劫持方案 Object.defineProperty 对象处理


    observe(data);
  }
  /**
   * 初始化状态 - 数据劫持
   * @param {object} vm - Vue实例
   */


  function initState(vm) {
    var opts = vm.$options;

    if (opts.props) ;

    if (opts.methods) ;

    if (opts.data) {
      initData(vm);
    }

    if (opts.computed) ;

    if (opts.watch) ;
  }

  /* eslint-disable no-useless-escape */
  var ncname = '[a-zA-Z_][\\-\\.0-9_a-zA-Z]*';
  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")");
  var startTagOpen = new RegExp("^<".concat(qnameCapture)); // 标签开头的正则 捕获的内容是标签名

  var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>")); // 匹配标签结尾的 </div>

  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的

  var startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >

  /**
   * 解析HTML为抽象语法树(AST)
   * @param {string} html
   */

  function parseHTML(html) {
    function createASTElement(tagName, attrs) {
      return {
        tag: tagName,
        type: 1,
        children: [],
        attrs: attrs,
        parent: null
      };
    }

    var root;
    var currentParent;
    var stack = [];

    function start(tagName, attrs) {
      var element = createASTElement(tagName, attrs);

      if (!root) {
        root = element;
      }

      currentParent = element; // 保存当前解析的标签

      stack.push(element); // 将生成的ast元素放到栈中
    }

    function end(tagName) {
      var element = stack.pop(); // 取出栈中的最后一个

      currentParent = stack[stack.length - 1];

      if (currentParent) {
        // 在闭合时可以知道该标签的父节点
        // 解决ast父子关系
        element.parent = currentParent;
        currentParent.children.push(element);
      }
    }

    function chars(text) {
      // text = text.replace(/\s/g, '') // 删除空字符串
      if (text) {
        currentParent.children.push({
          type: 3,
          text: text
        });
      }
    }

    while (html) {
      var textEnd = html.indexOf('<');

      if (textEnd == 0) {
        // 处理标签
        var startTagMatch = parseStartTag(); // 开始标签匹配的结果

        if (startTagMatch) {
          start(startTagMatch.tagName, startTagMatch.attrs);
          continue;
        }

        var endTagMatch = html.match(endTag);

        if (endTagMatch) {
          advance(endTagMatch[0].length);
          end(endTagMatch[1]); // 将结束标签传入

          continue;
        }
      }

      var text = void 0;

      if (textEnd > 0) {
        // 处理文本
        // 截取文本
        text = html.substring(0, textEnd);
      }

      if (text) {
        advance(text.length);
        chars(text);
      }
    }

    function advance(n) {
      // 截取剩余字符串
      html = html.substring(n);
    }

    function parseStartTag() {
      // 解析标签头
      var start = html.match(startTagOpen);

      if (start) {
        var match = {
          tagName: start[1],
          attrs: []
        };
        advance(start[0].length); // 删除开始标签

        var _end;

        var attr;

        while (!(_end = html.match(startTagClose)) && (attr = html.match(attribute))) {
          match.attrs.push({
            name: attr[1],
            value: attr[3] || attr[4] || attr[5]
          });
          advance(attr[0].length);
        }

        if (_end) {
          advance(_end[0].length);
          return match;
        }
      }
    }

    return root;
  }

  var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // FROM: <div id="app" style="color:red"> hello {{name}} <span>hello</span></div>
  // TO: render() {
  //   return _c('div', {id: 'app', style: {color: 'red'}}, _v('hello' + _s(name)), _c('span', null, _v('hello')))
  // }

  /**
   * 解析标签属性
   * @param {object} attrs
   */

  function genProps(attrs) {
    var str = '';

    for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i];

      if (attr.name === 'style') {
        (function () {
          var obj = {};
          attr.value.split(';').forEach(function (item) {
            var _item$split = item.split(':'),
                _item$split2 = _slicedToArray(_item$split, 2),
                key = _item$split2[0],
                value = _item$split2[1];

            obj[key] = value;
          });
          attr.value = obj;
        })();
      }

      str += "".concat(attr.name, ":").concat(JSON.stringify(attr.value), ",");
    }

    return "{".concat(str.slice(0, -1), "}");
  }
  /**
   * 解析子节点
   * @param {object} node - 子节点
   */


  function gen(node) {
    if (node.type == 1) {
      // 如果是元素节点
      return generate(node);
    }

    var text = node.text; // 获取文本
    // 如果是普通文本 不带{{}}

    if (!defaultTagRE.test(text)) {
      return "_v(".concat(JSON.stringify(text), ")");
    }

    var tokens = [];
    var lastIndex = defaultTagRE.lastIndex = 0; // 重置正则匹配

    var match, index;

    while (match = defaultTagRE.exec(text)) {
      index = match.index;

      if (index > lastIndex) {
        tokens.push(JSON.stringify(text.slice(lastIndex, index)));
      }

      tokens.push("_s(".concat(match[1].trim(), ")"));
      lastIndex = index + match[0].length;
    }

    if (lastIndex < text.length) {
      tokens.push(JSON.stringify(text.slice(lastIndex)));
    }

    return "_v(".concat(tokens.join('+'), ")");
  }
  /**
   * 拼接子节点
   * @param {object} el - ASTNode
   */


  function genChildren(el) {
    var children = el.children;

    if (children) {
      // 将所有转化后的子节点用逗号拼接
      return children.map(function (child) {
        return gen(child);
      }).join(',');
    }
  }
  /**
   * 解析AST为render返回值
   * @param {object} el - ASTNode
   */


  function generate(el) {
    var children = genChildren(el); // 子节点的生成

    var code = "_c('".concat(el.tag, "', ").concat(el.attrs.length ? "".concat(genProps(el.attrs)) : 'undefined').concat(children ? ",".concat(children) : '', ")");
    return code;
  }

  /**
   * 将HTML模板解析成render函数
   * @param {*} template - HTML模板
   */

  function compileToFunctions(template) {
    // 将模板解析成ast树
    var ast = parseHTML(template); // 1. 通过ast生成代码
    // 2. 优化静态节点
    // 3. 通过AST树 生成代码

    var code = generate(ast); //4 . 将字符串变成函数

    var render = new Function("with (this) { return ".concat(code, " }"));
    return render;
  }

  function patch(oldVnode, vnode) {
    // 将虚拟节点转化成真实节点
    var el = createElm(vnode);
    var parentElm = oldVnode.parentNode;
    parentElm.insertBefore(el, oldVnode.nextSibling);
    parentElm.removeChild(oldVnode);
    return el;
  }
  /**
   * 根据虚拟dom创建真实节点
   * @param {object} vnode - 虚拟dom
   */

  function createElm(vnode) {
    var tag = vnode.tag,
        children = vnode.children,
        key = vnode.key,
        data = vnode.data,
        text = vnode.text;

    if (typeof tag == 'string') {
      vnode.el = document.createElement(tag); // 更新属性

      updateProperties(vnode);
      children.forEach(function (child) {
        vnode.el.appendChild(createElm(child));
      });
    } else {
      vnode.el = document.createTextNode(text);
    }

    return vnode.el;
  }

  function updateProperties(vnode) {
    var el = vnode.el;
    var newProps = vnode.data || {};

    for (var key in newProps) {
      if (key === 'style') {
        for (var styleName in newProps.style) {
          el.style[styleName] = newProps.style[styleName];
        }
      } else if (key === 'class') {
        el.className = el["class"];
      } else {
        el.setAttribute(key, newProps[key]);
      }
    }
  }

  var id = 0;

  var Watcher = /*#__PURE__*/function () {
    // exprOrFn vm._update(vm._render())
    function Watcher(vm, exprOrFn, cb, options) {
      _classCallCheck(this, Watcher);

      this.vm = vm;
      this.exprOrFn = exprOrFn;
      this.cb = cb;
      this.options = options;
      this.id = id++; // watcher 的唯一标识

      if (typeof exprOrFn === 'function') {
        this.getter = exprOrFn;
      }

      this.get();
    }

    _createClass(Watcher, [{
      key: "get",
      value: function get() {
        pushTarget(this); // 当前watcher实例

        this.getter(); // 调用exprOrFn 渲染页面

        popTarget();
      }
    }, {
      key: "update",
      value: function update() {
        this.get();
      }
    }]);

    return Watcher;
  }();

  /**
   * Vue生命周期扩展
   * @param {object} Vue - Vue 实例
   */

  function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
      var vm = this;
      vm.$el = patch(vm.$el, vnode);
    };
  }
  /**
   * 挂载Vue组件
   * @param {object} vm - Vue 实例
   * @param {string} el - 挂载点
   */

  function mountComponent(vm, el) {
    // 调用render方法去渲染 el 属性
    callHook(vm, 'beforeMount'); // 先调用 render 方法创建虚拟节点，再将虚拟节点渲染到页面上

    var updateComponent = function updateComponent() {
      vm._update(vm._render());
    }; // watcher 用于渲染


    var watcher = new Watcher(vm, updateComponent, function () {
      callHook(vm, 'beforeUpdate');
    }, true);
    callHook(vm, 'mounted');
  }
  /**
   * 调用生命周期钩子
   * @param {object} vm - Vue 实例
   * @param {string} hook - 钩子名称
   */

  function callHook(vm, hook) {
    var handlers = vm.$options[hook];

    if (handlers) {
      for (var i = 0, len = handlers.length; i < len; i++) {
        handlers[i].call(vm);
      }
    }
  }

  /**
   * Vue初始化功能扩展插件
   * @param {object} Vue - Vue构造函数
   */

  function initMixin(Vue) {
    /**
     * 初始化方法
     * @param {object} options
     */
    Vue.prototype._init = function (options) {
      var vm = this;
      vm.$options = mergeOptions(vm.constructor.options, options);
      callHook(vm, 'beforeCreate'); // 初始化状态(数据劫持，当数据改变时更新视图)

      initState(vm);
      callHook(vm, 'created'); // 如果当前有el属性说明要渲染模板

      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
    };
    /**
     * 挂载节点方法
     * @param {string} params - 挂载点
     */


    Vue.prototype.$mount = function (el) {
      var vm = this;
      var options = vm.$options; // 获取挂载节点

      el = document.querySelector(el);
      vm.$el = el; // 判断有没有render方法

      if (!options.render) {
        // 无render
        // 将template转换成render方法
        var template = options.template;

        if (!template && el) {
          // 无template
          // 使用挂载点作为模板
          template = el.outerHTML;
        } // 编译原理 将模板编译成render函数


        var render = compileToFunctions(template);
        options.render = render;
      } // 有render(用户写的或者是使用模板编译出来的)
      // 挂载组件


      mountComponent(vm);
    };
  }

  /**
   * Vue渲染的扩展
   * @param {object} Vue - Vue 实例
   */
  function renderMixin(Vue) {
    Vue.prototype._c = function () {
      // 创建虚拟dom元素
      return createElement.apply(void 0, arguments);
    };

    Vue.prototype._s = function (val) {
      // 获取插值内容并转化为字符串
      return val == null ? '' : _typeof(val) == 'object' ? JSON.stringify(val) : val;
    };

    Vue.prototype._v = function (text) {
      // 创建虚拟dom文本元素
      return createTextVnode(text);
    };

    Vue.prototype._render = function () {
      // _render = render
      var vm = this;
      var render = vm.$options.render;
      var vnode = render.call(vm);
      return vnode;
    };
  }

  function createElement(tag) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      children[_key - 2] = arguments[_key];
    }

    return vnode(tag, data, data.key, children);
  }

  function createTextVnode(text) {
    return vnode(undefined, undefined, undefined, undefined, text);
  }
  /**
   * 生成虚拟dom
   * 对AST的扩展, 产生虚拟dom
   * @param {string} [ tag ] - 标签
   * @param {object} [ data ] - 标签属性对象
   * @param {string} [ key ] - 节点 key 值
   * @param {Array} [ children ] - 子节点
   * @param {string} [ text ] - 文本内容
   */


  function vnode(tag, data, key, children, text) {
    return {
      tag: tag,
      data: data,
      key: key,
      children: children,
      text: text
    };
  }

  function initGlobalApi(Vue) {
    Vue.options = {};

    Vue.mixin = function (mixin) {
      this.options = mergeOptions(this.options, mixin);
    };
  }

  /**
   * Vue 构造函数
   * @param {*} options
   */

  function Vue(options) {
    this._init(options); // 组件初始化入口

  }
  /**
   * 通过插件的方式将Vue的初始化方法扩展到Vue原型上
   */
  // 扩展了初始化功能


  initMixin(Vue); // _init
  // 扩展了生命周期相关(更新 + 挂载)

  lifecycleMixin(Vue); // _update
  // 扩展了Vue的渲染方法

  renderMixin(Vue); // _render

  /**
   * 静态方法 Vue.component Vue.directive Vue.extend Vue.mixin
   */

  initGlobalApi(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
