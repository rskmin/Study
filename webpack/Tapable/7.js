/**
 * AsyncSeriesHook 异步串行钩子
 */
let {AsyncSeriesHook} = require('tapable');
let hook = new AsyncSeriesHook(['name']);
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
  console.timeEnd('cost');
  console.log(err);
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
}, (error) => {
  console.log(error);
  console.timeEnd('cost');
});