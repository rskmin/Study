class Hook {
  constructor(args) {
    if (!Array.isArray(args)) args = [];
    this._args = args; // 用来存放参数列表
    this.taps = []; // 用来放钩子函数对象，{name:钩子名称,fn:钩子函数}
    this._x = void 0; // 存放的是钩子函数
  }
  tap(options, fn) {
    if (typeof options === 'string') {
      options = {name:options};
    }
    options.fn = fn;
    this._insert(options);
  }
  _insert(item) {
    this.taps.push(item);
  }
}

module.exports = Hook;