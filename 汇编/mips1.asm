# func fact(int n) {
# 	if (n == 0) {
#		return 1
#	}
# 	return fact(n-1) * n
#}

# 开始递归函数调用

addiu $sp, $0, 0x10010080 # 初始化 $sp 地址

addiu $s0, $0, 5 # n = 5 # 初始化 s0 = 5
# 入栈操作
sw $s0, 0($sp) # 把 $s0 寄存器中的值 写到指针 $sp 偏移量为0的地址 sp = s0 = 5
addiu $sp, $sp, -4 # 指针地址-4 $sp 指向新地址，值未知

jal FACT # 跳转到 FACT 标签(函数体)
nop # 这一行什么都不做(上一行执行完会执行下一行才去跳转
j END # 函数结束返回到这一行再跳转到结束

FACT:

# 压栈返回地址 (调用位置
sw $ra, 0($sp)
addiu $sp, $sp, -4

# 读取入参
lw $s0, 8($sp) # 读取$sp偏移量为8的值到 $s0 寄存器 s0 = 5

# 压栈返回值 (虽然返回值未知但是先占取位置
sw $0, 0($sp)
addiu $sp, $sp, -4

# 递归 base 条件
# if ( n == 0 ) { return 1 }
bne $s0, $0, RECURSION # 如果参数不等于 0 则跳转到 RECURSION 标签
nop
lw $t1, 8($sp) # 读取返回地址
# 出栈: 返回值, 返回地址
addiu $sp, $sp, 8
# 压栈返回值
addiu $s0, $zero, 1
sw $s0, 0($sp)
addiu $sp, $sp, -4

jr $t1
nop

RECURSION: # recursion
# return fact(n-1) * n

# 压栈参数
addiu $s1, $s0, -1
sw $s1, 0($sp)
addiu $sp, $sp, -4

jal FACT
nop

# 现在的栈是什么样子的？ 参数 | 父函数返回地址 | 父函数返回值 | 子函数的参数 | 子函数的返回值 | 当前SP
# return fact(n-1) * n
# 当前参数
lw $s0, 20($sp)
# 子函数返回值
lw $s1, 4($sp)
# 返回地址
lw $t1, 16($sp)

mult $s1, $s0 # 乘法会存到lo寄存器中
mflo $s2 # 从lo寄存器中取出来到$s2

# 出栈(指针回到父函数的返回地址
addiu $sp, $sp, 16

# 返回值压栈
sw $s2, 0($sp)
addiu $sp, $sp, -4

jr $t1 # 回到父函数执行的位置
nop

END: