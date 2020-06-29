let Promise = require('./promise')

Promise.reject(new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('ok')
  }, 1000)
})).then(data => {
  console.log(data)
}).catch(err => {
  console.log(err)
})