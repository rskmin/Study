assume cs:code, ds:data, ss:stack

data SEGMENT USE16
	     db '1234', 0
data ENDS

stack SEGMENT USE16
	      db 128 dup(0)
stack ENDS

code SEGMENT USE16
	start:        mov  ax, stack
	              mov  ss, ax
	              mov  sp, 128

	              mov  bx, data
	              mov  ds, bx
	              mov  si, 0

	              mov  bx, 0B800H
	              mov  es, bx
	              mov  di, 160*10 + 40*2

	              call show_string

	              mov  ah, 4cH
	              int  21H

	show_string:  push cx
	              push ds
	              push es
	              push si
	              push di

	              mov  cx, 0
	              mov  cl, ds:[si]
	              jcxz showStringRet
	              mov  es:[di+0], cl
	              mov  byte ptr es:[di+1], 00000010B
	              add  di, 2
	              inc  si
	              jmp  show_string

	showStringRet:pop  di
	              pop  si
	              pop  es
	              pop  ds
	              pop  cx
	              ret


code ENDS

end start