assume cs:code, ds:data, ss:stack

data SEGMENT USE16
	     db 'ibm             '
	     db 'dec             '
	     db 'dos             '
	     db 'vax             '
data ENDS

stack SEGMENT USE16
	      dw 0,0,0,0
	      dw 0,0,0,0
	      dw 0,0,0,0
	      dw 0,0,0,0
stack ENDS

code SEGMENT USE16
	start:      mov  ax, data
	            mov  ds, ax

	            mov  ax, stack
	            mov  ss, ax
	            mov  sp, 32

	            mov  bx, 0

	            mov  cx, 4
	upRow:      push cx
	            mov  cx, 3
	            mov  si, 0

	upperString:mov  al, ds:[bx+si]
	            and  al, 11011111B
	            mov  ds:[bx+si], al
	            inc  si
	            loop upperString
	            pop  cx
	            add  bx, 16
	            loop upRow

	            mov  ah, 4cH
	            int  21
code ENDS

end start