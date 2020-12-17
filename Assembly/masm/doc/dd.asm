assume cs:code, ds:data, ss:stack

data SEGMENT USE16
	     dd 100001
	     dw 100
	     dw 0
data ENDS

stack SEGMENT USE16
	      dw 0, 0, 0, 0
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

        mov ax, ds:[0]
        mov dx, ds:[2]

        div word ptr ds:[4]

	      mov ah, 4cH
	      int 21
code ENDS

end start