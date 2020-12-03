assume cs:code

;
code SEGMENT USE16

	          dw   1,2,3,4,5,6,7,8

	start:    mov  bx, 0
	          mov  ax, 0

	          mov  cx, 8

	addNumber:add  ax, cs:[bx]
	          add  bx, 2
	          loop addNumber


	          mov  ax, 4c00H
	          int  21
code ENDS

end start