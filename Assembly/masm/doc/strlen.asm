assume cs:code, ds:data, ss:stack

data SEGMENT USE16
	     db 'DEC'      	;公司名
	     db 'Ken Olsen'	;总裁名
	     dw 137        	;排名
	     dw 40         	;收入
	     db 'PDP'      	;著名产品
data ENDS

stack SEGMENT USE16
	      dw 0, 0, 0, 0
	      dw 0, 0, 0, 0
	      dw 0, 0, 0, 0
	      dw 0, 0, 0, 0
stack ENDS

code SEGMENT USE16
	start:mov ax, data
	      mov ds, ax

	      mov ax, stack
	      mov ss, ax
	      mov sp, 32

        mov bx, 0

        mov word ptr ds:[bx+12], 38

        add word ptr ds:[bx+14], 78

        mov si, 0

        mov byte ptr ds:[bx+16+si], 'V'

        inc si
        mov byte ptr ds:[bx+16+si], 'A'

        inc si
        mov byte ptr ds:[bx+16+si], 'X'

	      mov ah, 4cH
	      int 21
code ENDS

end start