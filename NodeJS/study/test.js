const fs = require('fs')
const path = require('path')

/**
 * 同步递归删除
 * @param {*} dir
 */
// function rmdirSync(dir) {
//   // 获取目标状态
//   let statObj = fs.statSync(dir)

//   if (statObj.isDirectory()) {// 目标为文件夹
//     // 读取文件夹下内容
//     const dirs = fs.readdirSync(dir)
//     // 遍历处理文件夹下节点
//     dirs.forEach(item => {
//       const currentPath = path.join(dir, item)
//       rmdirSync(currentPath)
//     })
//     // 删除空文件夹
//     fs.rmdirSync(dir)
//   } else {// 目标为文件
//     // 删除文件
//     fs.unlinkSync(dir)
//   }
// }

/**
 * 同步栈式删除(层序遍历)
 * @param {*} dir
 */
function rmdirSync(dir) {
  let index = 0
  let stack = [dir]
  let current
  while (current = stack[index++]) {
    const statObj = fs.statSync(current)
    if (statObj.isDirectory()) {
      let dirs = fs.readdirSync(current)
      stack = [...stack, ...dirs.map(item => path.join(current, item))]
    }
  }
  for (let i = stack.length - 1; i >= 0; i--) {
    const statObj = fs.statSync(stack[i])
    if (statObj.isDirectory()) {
      fs.rmdirSync(stack[i])
    } else {
      fs.unlinkSync(stack[i])
    }
  }
}

/**
 * 异步串行删除
 * @param {*} dir
 * @param {*} cb
 */
// function rmdir(dir, cb) {
//   fs.stat(dir, (err, statObj) => {
//     if (statObj.isDirectory()) {
//       fs.readdir(dir, function (err, dirs) {
//         const absDirs = dirs.map(item => path.join(dir, item))
//         let index = 0
//         function next() {
//           if (index === absDirs.length) return fs.rmdir(dir, cb)
//           let current = absDirs[index++]
//           // 将串行操作通过next进行串联，在前一个文件夹删除成功后再进行下一个文件夹的删除
//           rmdir(current, next)
//         }
//         next()
//       })
//     } else {
//       fs.unlink(dir, cb)
//     }
//   })
// }

/**
 * 异步并发删除
 * @param {*} dir
 * @param {*} cb
 */
// function rmdir(dir, cb) {
//   fs.stat(dir, (err, statObj) => {
//     if (statObj.isDirectory()) {
//       fs.readdir(dir, function (err, dirs) {
//         const absDirs = dirs.map(item => path.join(dir, item))
//         if (dirs.length === 0) {
//           return fs.rmdir(dir, cb)
//         }

//         let index = 0
//         function done() {
//           if (++index === absDirs.length) {
//             fs.rmdir(dir, cb)
//           }
//         }
//         // 并发删除
//         for (let i = 0; i < dirs.length; i++) {
//           let absDir = absDirs[i]
//           rmdir(absDir, done)
//         }
//       })
//     } else {
//       fs.unlink(dir, cb)
//     }
//   })
// }

// rmdir(path.resolve(__dirname, 'c'), function() {
//   console.log('删除成功')
// })

rmdirSync(path.resolve(__dirname, 'c'))