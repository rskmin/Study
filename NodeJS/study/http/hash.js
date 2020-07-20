const crypto = require('crypto')

// md5
// sha1 sha256 hmac
let hash = crypto.createHash('md5').update('hello world').digest('base64')

console.log(hash)