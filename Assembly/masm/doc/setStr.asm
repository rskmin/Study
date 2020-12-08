assume cs:code

; 向内存 2000H:1000H 中存放 0-F 的字节型数据
code SEGMENT USE16
	; 指定存储数据的起始内存
	          mov ax, 2000H
	          mov ds, ax
	          mov bx, 1000H

	          mov dl, 0      	; 初始化数值
            mov cx, 16 ; 初始化循环次数

	; 写入字节型数据
	setNumber:mov ds:[bx], dl
	          inc dl         	; 数值 +1
	          inc bx         	; 地址 +1

	          loop setNumber
  
  
	; 退出程序
	          mov ax, 4c00H
	          int 21H
code ENDS

end