assume cs:code, ds:data, ss:stack

data SEGMENT USE16
	     db 'welcome to masm!'

	     db 00000010B         	; 黑底绿字
	     db 00100100B         	; 绿底红字
	     db 01110001B         	; 白底蓝字
data ENDS

stack SEGMENT USE16
	      db 128 dup(0)
stack ENDS

code SEGMENT USE16
	start:   mov  ax, stack
	         mov  ss, ax
	         mov  sp, 128

	         mov  ax, data
	         mov  ds, ax

	         mov  bx, 0B800H
	         mov  es, bx

	         mov  si, 0
	         mov  di, 160*10 + 30*2
	         mov  bx, 16
	         mov  dx, 0

	         mov  cx, 3

	showMasm:push bx
	         push cx
	         push si
	         push di

	         mov  cx, 16
	         mov  dh, ds:[bx]

	showRow: mov  dl, ds:[si]
	         mov  es:[di], dx
	         add  di, 2
	         inc  si
	         loop showRow

	         pop  di
	         pop  si
	         pop  cx
	         pop  bx
	         add  di, 160
	         inc  bx
	         loop showMasm

	         mov  ah, 4cH
	         int  21H
code ENDS

end start