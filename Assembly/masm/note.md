# MASM(8086 CUP)汇编

- CPU执行的`指令`从 CS(段地址寄存器) IP(偏移地址寄存器) 所组合的地址中来
- 指令和数据在内存中是没有区别的
- 数据从哪里来
  - 寄存器中
  - 内存中
- 数据长度
  - 字节型数据（8位）
  - 字型数据（16位）

## 汇编语言组成

- 汇编指令
  - 被编译器翻译成 机器指令-机器码 又 CUP 执行
- 伪指令
  - 由编译器执行
- 符号体系
  - 由编译器执行

## 寄存器

### 数据寄存器

- AX = AH + AL
- BX = BH + BL    也可以被当作偏移地址寄存器
- CX = CH + CL    有其它作用
- DX = DH + DL

### 地址寄存器

#### 段地址寄存器

> 16位寄存器，可各自分割为2个相互独立的8位寄存器

- DS
  - 一般用来访问数据
- ES
- SS
- CS

#### 偏移地址寄存器

- SI
- DI

### 标志位寄存器

## DEBUG

- d: 查看内存
- u: 将内存中的机器指令翻译成汇编指令展示
- r: 查看寄存器/修改寄存器
- t: 执行当前(CS:IP)命令
- a: 输入汇编指令
- e: 修改内存内容
- p: 执行 `int` 指令, 跳过 `loop` 指令

## 指令

### 指令执行过程

- CUP从 当前的 CS 和 IP 指向的内存单元读取指令，然后将读取的指令存入指令缓冲器
- IP = IP + 所读指令的字节数，从而指向下一条指令
- 执行指令缓冲器中的内容， 回到第一步

### 转移指令(jmp)

> 改变 CS IP 寄存器的 汇编指令

```assembly
jmp 2AE3:0003 ; CS = 2AE3H , IP = 0003H
jmp 0003 ; IP = 0003H
```

### 移动指令(mov)

> 将数据从一个地方移动到另一个内存中

```assembly
mov ax, 1000 ; 将 1000H 存入 ax 寄存器中， ax = 1000H
```

### 减法指令(sub)

```assembly
sub ax, ax ; ax = ax - ax
```

### 栈操作指令(push, pop)

```assembly
push ax ; 将 ax寄存器 中的数据存入栈中
```

```assembly
pop bx ; 将栈顶数据取出存入 bx寄存器 中
```

### 自增指令(inc)

```assembly
inc ax ; 将 ax 寄存器中的值 + 1，等同于 add ax, 1，但指令只占用一个字节
```

### 循环指令(loop)

1. 将cx的值 -1
2. 判断cx中的值，不为0则跳转（jmp）到 标号（内存地址）位置继续执行，等于0就执行下面的内容

### and（&） 和 or（｜） 指令

二进制与或运算指令

## 栈（字型数据操作）

> 栈是一段连续的内存单元，也就是一段连续的内存地址，具有特定的访问方式（先进后出），从高地址到低地址

> `8086CUP`中将 段地址寄存器 SS 和偏移地址寄存器SP 所组合出来的内存地址当作栈顶标记

- 栈顶标记：标记了最后进栈数据的位置
- 入栈（push）：将数据放入栈顶标记的上方
- 出栈（pop）：将数据从栈顶取出放到十六位寄存器或内存中

### 作用

- 临时性保存数据

## 内存段安全

> 随意向某一段内存空间中写入内容是很危险的

- 安全的内存空间（0:200 ～ 0:2FF) 256个字节
- 操作系统分配的内存空间
  - 程序加载时系统分配的内存空间
  - 程序在执行过程中向系统申请的内存空间

### 系统如何分配内存

- exe文件中除了整个程序还包括了一些信息
  - 文件有多大
  - 程序在哪里
- 系统根据描述信息对寄存器进行相关设置
- `start`伪指令告诉系统程序的起始位置，系统通过`start`的信息设置 CS、IP
- 开始的 256 个字节时 PSP 区 用于程序与系统的通信

## 定义数据

```assembly
dw	1,2,3,4,5,6,7,8 ; define word 定义字型数据
db  1,2,3,4,5,6,7,8 ; define byte 定义字型数据
```

程序的起始地址是 CS:IP, 数据在 CS:0 开始的内存

## 定义栈

```assembly
; 定义栈空间
dw   0,0,0,0,0,0,0,0
dw   0,0,0,0,0,0,0,0
```

## 多段程序

- 在一个段中定义数据占用了 IP 的起始值，减少了可执行指令的数量，所以将数据的定义放到另一个段中
- 一个段占用的大小为 `16 * n 个字节` 

```assembly
assume cs:code,ds:data,ss:stack

; 数据段
data SEGMENT 
	     dw 0123H,0456H,0789H,0ABCH,0DEFH,0FEDH,0CBAH,0987H
data ENDS

; 栈段
stack SEGMENT
	      dw 0,0,0,0,0,0,0,0
	      dw 0,0,0,0,0,0,0,0
stack ENDS

;description
code SEGMENT
	start:   mov  ax, stack
	         mov  ss, ax
	         mov  sp, 32

	         mov  ax, data
	         mov  ds, ax

	         mov  bx, 0
	         mov  cx, 8

	pushData:push ds:[bx]
	         add  bx, 2
	         loop pushData


	         mov  ax, 4c00H
	         int  21
code ENDS

end start
```

## 技巧

### 字符大小写转换

```assembly
assume cs:code, ds:data

data SEGMENT USE16
	     db 'BaSie'
	     db 'iNFOrMaTiOn'
data ENDS

code SEGMENT USE16
	start:      mov  bx, data
	            mov  ds, bx

	            mov  bx, 0
	            mov  cx, 5

	toUpperCase:mov  al, ds:[bx]
	            and  al, 11011111B
	            mov  ds:[bx], al
	            inc  bx
	            loop toUpperCase

	            mov  cx, 11
	toLowerCase:mov  al, ds:[bx]
	            or   al, 00100000B
	            mov  ds:[bx], al
	            inc  bx
	            loop toLowerCase

	            mov  ah, 4cH
	            int  21H
code ENDS

end start
```

## 归纳

1. 获取操作指令（CS+IP所指内存数据代表操作）
2. 获取操作数据
   1. 从普通内存中（DS+[指定偏移地址0000]），一般用 BX 作为偏移地址
   2. 从栈内存中（SS+SP）
3. 循环操作（loop指令根据 CX 的值决定执行次数）

4. 数据到哪里去
   1. 通常使用 ES 寄存器