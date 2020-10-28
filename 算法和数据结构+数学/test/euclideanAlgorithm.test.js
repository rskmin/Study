const { create } = require('domain');
const readline = require('readline');
const euclideanAlgorithm = require('../base/euclideanAlgorithm.js');

const createRl = () => readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const inputNumber = () => new Promise((resolve, reject) => {
  const rl = createRl();
  console.log();
  rl.question('请输入一个非负整数(两次输入不能全为0)：\n', (line) => {
    const number = +line.trim();
    resolve(number);
    rl.close();
  });
});

async function main() {
  const m = await inputNumber();
  console.log(m);
  const n = await inputNumber();
  console.log(n);
  console.log('\n由欧几里得算法得：');
  const res = euclideanAlgorithm(m, n);
  console.log(`${m}和${n}的最大公约数为${res}。`);
};
main();