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

  /**
   * 劫持对象
   * @param {object} data
   * @param {*} key
   * @param {*} value
   */

  function defineReactive(data, key, value) {
    observe(value); // 递归劫持

    Object.defineProperty(data, key, {
      get: function get() {
        console.log('用户获取值了');
        return value;
      },
      set: function set(newValue) {
        if (newValue == value) return;
        observe(newValue); // 如果新值是个对象也要拦截

        value = newValue;
        console.log('用户设置值了');
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

  /**
   * Vue初始化功能扩展插件
   * @param {object} Vue - Vue构造函数
   */

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      vm.$options = options; // 初始化状态(数据劫持，当数据改变时更新视图)

      initState(vm);
    };
  }

  function Vue(options) {
    this._init(options);
  } // 扩展了初始化功能


  initMixin(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
