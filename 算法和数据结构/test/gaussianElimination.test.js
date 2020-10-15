const readline = require('readline');
const gaussianElimination = require('../base/gaussianElimination');

// example
// const A = [
//   [2, -1, 1],
//   [4, 1, -1],
//   [1, 1, 1],
// ];
// const b = [
//   1,
//   5,
//   0,
// ];

// const A = [
//   [1, 1, 1],
//   [2, 1, 1],
//   [1, -1, 3],
// ];
// const b = [
//   2,
//   3,
//   8,
// ];
// console.log(gaussianElimination(A, b));

/**
 * 创建输入流
 */
const createRl = () => readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const inputA = () => new Promise((resolve, reject) => {
  const rl = createRl();
  console.log('请输入系数矩阵，每行以空格分割，最后一行以q结束输入：');
  const A = [];
  rl.on('line', (line) => {
    const trimLine = line.trim();
    if (trimLine === 'q') {
      rl.close();
      resolve(A);
    } else {
      A.push(trimLine.split(' ').filter(i => i !== '').map(i => +i));
    }
  })
})

const inputB = () => new Promise((resolve, reject) => {
  const rl = createRl();
  let b;
  rl.question('请输入列向量，以空格分割：\n', (line) => {
    b = line.trim().split(' ').filter(i => i !== '').map(i => +i);
    rl.close();
    resolve(b);
  });
})

async function main() {
  const A = await inputA();
  console.log(A);
  const b = await inputB();
  console.log(b);
  console.log('\n由高斯消元法解得：');
  gaussianElimination(A, b).forEach((item, index) => {
    console.log(`x${index + 1}: ${item}`);
  });
}

main();