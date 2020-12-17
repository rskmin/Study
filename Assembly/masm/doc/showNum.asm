assume cs:code, ds:data, ss:stack

data SEGMENT USE16
	     dd 1234
data ENDS

stack SEGMENT USE16
	      db 128 dup(0)
stack ENDS

code SEGMENT USE16
	start:      mov  ax, stack
	            mov  ss, ax
	            mov  sp, 128

	            mov  bx, data
	            mov  ds, bx
	            mov  si, 0

	            mov  bx, 0B800H
	            mov  es, bx
	            mov  di, 160*10
	            add  di, 40*2

	            mov  ax, ds:[si+0]
	            mov  dx, ds:[si+2]

	            call short_div

	            mov  ah, 4cH
	            int  21H


	;==========
	short_div:  mov  cx, 10
	            div  cx
	            add  dl, 30H
	            mov  es:[di+0], dl
	            mov  byte ptr es:[di+1], 00000010B
	            mov  cx, ax
	            jcxz shortDivRet
	            mov  dx, 0
	            sub  di, 2
              
	            jmp  short_div
	shortDivRet:ret


code ENDS

end start