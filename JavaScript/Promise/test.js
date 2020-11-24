const myPromise = require('./promise/promise');
function test() {
  new myPromise((resolve) => {
    resolve();
  }).then(() => {
    console.log('yes');
  });
  console.log('???');
}

// test();

function test2() {
  setTimeout(() => console.log('setTimeout'), 0)
  queueMicrotask(() => console.log('queueMicrotask'));
  console.log('hello');
}

test2();