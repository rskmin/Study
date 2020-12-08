assume cs:code, ds:data

;description
data SEGMENT USE16
	     db '1. file         '
	     db '2. edit         '
	     db '3. seach        '
	     db '4. view         '
	     db '5. options      '
	     db '6. help         '
data ENDS

;description
code SEGMENT USE16
	start:   mov  ax, data
	         mov  ds, ax

	         mov  bx, 0
	         mov  si, 3

	         mov  cx, 6

	upletter:mov  al, ds:[bx+si]
	         and  al, 11011111B
	         mov  ds:[bx+si], al
	         add  bx, 16
	         loop upLetter

	         mov  ah, 4cH
	         int  21
code ENDS

end start