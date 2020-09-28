let {SyncBailHook} = require('tapable');

/**
 * 同步保险钩子
 * 如果任意一个事件函数有返回值，返回值不为undefined，则直接结束
 */
// 创建钩子
const hook = new SyncBailHook(['name', 'age']);
// 注册事件
hook.tap('1', (name, age) => {
  console.log(1, name, age);
});
hook.tap('2', (name, age) => {
  console.log(2, name, age);
  return '2';
}); 
hook.tap('3', (name, age) => {
  console.log(3, name, age);
});
// 触发事件
hook.call('rskmin', 10);