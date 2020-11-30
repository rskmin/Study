const { nextTick } = require("process");

// console.log(process.argv);
nextTick(() => {
  console.log('nextTick');
});
console.log('1');
setImmediate(() => {
  console.log('setImmediate')
});
setTimeout(() => {
  console.log('setTimeout');
  nextTick(() => {
    console.log('setTimeout nextTick');
  });
});
queueMicrotask(() => {
  console.log('queueMicrotask');
});
