let {SyncHook} = require('./tapable');
/**
 * 同步钩子
 */
// 创建钩子
const hook = new SyncHook(['name', 'age']);
// 注册事件
hook.tap('1', (name, age) => {
  console.log(1, name, age);
});
hook.tap('2', (name, age) => {
  console.log(2, name, age);
});
hook.tap('3', (name, age) => {
  console.log(3, name, age);
});
// 触发事件
hook.call('rskmin', 10);