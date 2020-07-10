const fs = require('fs')

function copy(source, target, cb = () => {}) {
  const buffer = Buffer.alloc(3)
  let offsetRead = 0
  let offsetWrite = 0
  // 打开要读取的文件
  fs.open(source, 'r', (err, rfd) => {// fd: file descriptor 文件描述符 number
    // 打开|创建 要写入的文件
    fs.open(target, 'w', (err, wfd) => {

      function next() {
        fs.read(rfd, buffer, 0, 3, offsetRead, function(err, bytesRead) {
          offsetRead += bytesRead
          fs.write(wfd, buffer, 0, bytesRead, offsetWrite, (err, written) => {
            offsetWrite += written
            if (bytesRead === 3) {
              next()
            } else {
              fs.close(rfd, () => {})
              fs.close(wfd, () => {})
              cb()
            }
          })
        })
      }
      next()

    })
  })
}

copy('./test.json', 'copy.json', () => {
  console.log('拷贝结束')
})