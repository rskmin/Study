assume cs:code

;
code SEGMENT USE16

	; 分配数据段空间
	         dw   0123H,0456H,0789H,0DEFH,0FEDH,0CBAH,0987H

	; 分配栈空间
	         dw   0,0,0,0,0,0,0,0
	         dw   0,0,0,0,0,0,0,0

	start:   mov  ax, cs
	         mov  ss, ax
	         mov  sp, 48

	         mov  bx, 0
	         mov  cx, 8

	pushData:push cs:[bx]
	         add  bx, 2
	         loop pushData
  
	         mov  ax, 4c00H
	         int  21
code ENDS

end start