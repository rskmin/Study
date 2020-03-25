// 创建一个MVVM框架类
class MVVM {
  // 构造器
  constructor(options) {
    // 缓存重要属性
    this.$vm = this
    this.$el = options.el
    this.$data = options.data

    // 判断视图是否存在
    if(this.$el) {
      // 添加属性观察对象（实现属性挟持）
      new Observer(this.$data)
      //创建模板编译器
      this.$compiler = new TemplateCompiler(this.$el, this.$vm)
    }

  }

}