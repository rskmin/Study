// import { Base64 } from 'js-base64';
const { Base64 } = require('js-base64')

// 直接调用
const encode = Base64.encode('rskmin')
const decode = Base64.decode(encode)
console.log(decode)

// String继承
if (Base64.extendString) {
  Base64.extendString()
  const encode1 = 'rskmin'.toBase64()
  const decode1 = encode1.fromBase64()
  console.log(decode1)
}
