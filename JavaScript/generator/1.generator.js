// generator 迭代器(iterator)的生成器

// 类数组 有索引 有长度 能遍历

let likeArray = {
  '0': 1,
  '1': 2,
  '2': 3,
  '3': 4,
  length: 4
}

// Symbol 中有很多 元编程 的方法
// 元编程: 可以更改js本身的功能
// likeArray[Symbol.iterator] = function () {
//   let index = 0
//   return {
//     next: () => {
//       return { value: this[index], done: index++ === this.length }
//     }
//   }
// }

likeArray[Symbol.iterator] = function* () {
  let index = 0
  while (index !== this.length) {
    yield this[index++]
  }
}

// console.log(likeArray.toString())

console.log([...likeArray])