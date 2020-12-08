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