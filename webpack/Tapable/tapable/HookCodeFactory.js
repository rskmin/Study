class HookCodeFactory {
  setup(instance, options) {
    this.options = options;
    instance._x = options.taps.map(item => item.fn);
  }
  args() {
    return this.options.args.join(',');
  }
  header() {
    return `var _x = this._x;`
  }
  body() {
    return this.options.taps.map((item, i) => (
      `
      var _fn${i} = _x[${i}];
      _fn${i}(${this.args()});
      `
    )).join('\n');
  }
  create(options) {
    return new Function(this.args(), this.header() + this.body());
  }
}

module.exports = HookCodeFactory;