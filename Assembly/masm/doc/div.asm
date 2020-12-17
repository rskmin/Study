assume cs:code, ds:data, ss:stack

data SEGMENT USE16
	     db 16, 0, 3, 0
	     db 3, 0, 0FFH, 0FFH
	     db 0, 0, 0, 0
	     db 0, 0, 0, 0
data ENDS

stack SEGMENT USE16
	      dw 0, 0, 0, 0
	      dw 0, 0, 0, 0
	      dw 0, 0, 0, 0
	      dw 0, 0, 0, 0
stack ENDS

code SEGMENT USE16
	start:mov ax, stack
	      mov ss, ax
	      mov sp, 32

	      mov ax, data
	      mov ds, ax

        mov ax, 3e9H

        mov bx, 100

        div bx

	      mov ah, 4cH
	      int 21
code ENDS

end start