let r1 = Buffer.from('人')

console.log(r1)// e4 ba ba

console.log(0xe4.toString(2))
console.log(0xba.toString(2))
console.log(0xba.toString(2))
// 111001001011101010111010 (3*8)
// 00111001 00001011 00101010 00111010 (4*6 不足八位补零)

// 转回10进制
console.log(parseInt('00111001', 2)) // 0-63(前两位是0)最多取值范围就是64
console.log(parseInt('00001011', 2))
console.log(parseInt('00101010', 2))
console.log(parseInt('00111010', 2))

// 从64位对照表中取值
let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
str += str.toLocaleLowerCase()
str += '0123456789+/'

console.log(str[57] + str[11] + str[42] + str[58])
// 不够位会补等号