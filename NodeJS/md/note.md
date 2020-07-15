# 笔记

## base64

- 在网络传输过程中不能传输中文 => base64URL

- 图片可以转换成base64 只要能写成url的都可以使用bae64 (base64可以代表这个文件， 大文件不能转base64)

- 汉字 1个汉字3个字节 3\*8 = 24位 => 4\*6 (base64会比原内容大1/3)

>汉字转换规则

````js
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
````

>存在英文不够位时会补等号

## 0.1 + 0.2 != 0.3 问题

- 计算机只进行二进制运算，0.1 等小数转化为二进制(乘二取余)无法进行有限转化所以会出现误差

## 如何处理多个并发占用内存的情况

- 限制并发，将超出并发上限的部分缓存起来，等到内存空闲时再调用