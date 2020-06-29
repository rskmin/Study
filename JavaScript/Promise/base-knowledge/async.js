const fs = require('fs')

fs.readFile('./name.txt', 'utf8', (err, data) => {
  console.log(data)
})

fs.readFile('./age.txt', 'utf8', (err, data) => {
  console.log(data)
})
