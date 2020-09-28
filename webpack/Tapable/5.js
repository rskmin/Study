let { AsyncParallelHook } = require('tapable');
// 异步 并行
let hook = new AsyncParallelHook(['name']);
// 异步有三种方式进行函数注册
// tap
/* hook.tap('1', (name) => {
  console.log(1, name);
});
hook.tap('2', (name) => {
  console.log(2, name);
});
hook.tap('3', (name) => {
  console.log(3, name);
});
// 异步不能调用call要调用callAsync
hook.callAsync('rskmin', (err) => {
  console.log(err);
}); */

// tapAsync
/* console.time('cost');
hook.tapAsync('1', (name, callback) => {
  setTimeout(() => {
    console.log(1, name);
    callback();
  }, 1000);
});
hook.tapAsync('2', (name, callback) => {
  setTimeout(() => {
    console.log(2, name);
    callback();
  }, 2000);
});
hook.tapAsync('3', (name, callback) => {
  setTimeout(() => {
    console.log(3, name);
    callback();
  }, 3000);
});
hook.callAsync('rskmin', (err) => {
  console.log(err);
  console.timeEnd('cost');
}); */

console.time('cost');
hook.tapPromise('1', (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(1, name);
      resolve();
    }, 1000);
  })
});

hook.tapPromise('2', (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(2, name);
      resolve();
    }, 2000);
  })
});

hook.tapPromise('3', (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(3, name);
      resolve();
    }, 3000);
  })
});

hook.promise('rskmin').then((data) => {
  console.log(data);
  console.timeEnd('cost');
});