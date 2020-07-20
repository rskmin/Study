const zlib = require('zlib')
const fs = require('fs')
const path = require('path')

fs.createReadStream(path.resolve(__dirname, '1.txt')).pipe(zlib.createGzip()).pipe(fs.createWriteStream(path.resolve(__dirname, '1.gz')))