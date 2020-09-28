let {SyncLoopHook} = require('tapable');

/**
 * 如果返回值是undefined会执行下一个钩子，否则重新执行该钩子的回调
 */
// 创建钩子
let hook = new SyncLoopHook(['name', 'age']);
let counter1 = 0;
let counter2 = 0;
let counter3 = 0;
// 注册事件
hook.tap('A', (name, age) => {
  console.log('A', 'counter1', counter1);
  if (++counter1 === 1) {
    counter1 = 0;
    return;
  }
  return 'A';
});
hook.tap('B', (name, age) => {
  console.log('B', 'counter2', counter2);
  if (++counter2 === 2) {
    counter2 = 0;
    return;
  }
  return 'B';
});
hook.tap('C', (name, age) => {
  console.log('C', 'counter3', counter3);
  if (++counter3 === 1) {
    counter3 = 0;
    return;
  }
  return 'C';
});
// 触发事件
hook.call('rskmin', 10);