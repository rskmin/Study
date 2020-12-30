assume cs:code, ds:data, ss:stack

data SEGMENT USE16
	irShow1 db 'Interrupt service routine 1 is running...', 0DH, 0AH, '$'
	irShow2 db 'Interrupt service routine 2 is running...', 0DH, 0AH, '$'
	irShow3 db 'Interrupt service routine 3 is running...', 0DH, 0AH, '$'
data ENDS

stack SEGMENT USE16
	      db 128 dup(0)
stack ENDS

code SEGMENT USE16
	start: mov  ax, seg ir1
	       mov  ds, ax
	       mov  dx, offset ir1
	       mov  ax, 2572H
	       int  21H

	       mov  ax, seg ir2
	       mov  dx, ax
	       mov  dx, offset ir2
	       mov  ax, 2573H
	       int  21H

	       mov  ax, seg ir3
	       mov  dx, ax
	       mov  dx, offset ir3
	       mov  ax, 2574H
	       int  21H

	keyin: mov  ah, 0
	       int  16H
	       cmp  al, '1'
	       jz   serve1
	       cmp  al, '2'
	       jz   serve2
	       cmp  al, '3'
	       jz   serve3
	       cmp  al, 'q'
	       jz   exit
	       jmp  keyin

	serve1:int  72H
	       jmp  keyin

	serve2:int  73H
	       jmp  keyin

	serve3:int  74H
	       jmp  keyin
        
	exit:  
	       mov  ah, 4cH
	       int  21H

	        

ir1 PROC
	       push ds
	       push ax
	       push dx

	       mov  ax, seg irShow1
	       mov  ds, ax
	       mov  dx, offset irShow1
	       mov  ah, 9
	       int  21H

	       pop  dx
	       pop  ax
	       pop  ds
	       iret
ir1 ENDP

ir2 PROC
	       push ds
	       push ax
	       push dx

	       mov  ax, seg irShow2
	       mov  ds, ax
	       mov  dx, offset irShow2
	       mov  ah, 9
	       int  21H

	       pop  dx
	       pop  ax
	       pop  ds
	       iret
ir2 ENDP

ir3 PROC
	       push ds
	       push ax
	       push dx

	       mov  ax, seg irShow3
	       mov  ds, ax
	       mov  dx, offset irShow3
	       mov  ah, 9
	       int  21H

	       pop  dx
	       pop  ax
	       pop  ds
	       iret
ir3 ENDP

code ENDS

end start