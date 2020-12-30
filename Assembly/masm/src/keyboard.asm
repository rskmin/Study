assume cs:code

code SEGMENT USE16
	        org  100H
	start:  jmp  install

	flag    db   0
	oldint  dd   ?
	scantab db   0, 0, '1234567890-=', 08H, 0
	        db   'QWERTYUIOP[]', 0DH, 0
	        db   'ASDFGHJKL;', 0, 0, 0, 0
	        db   'ZXCVBNM,./', 0, 0, 0, 20H
	        db   13 dup(0)
	        db   '789-456+1230#'

	install:cli                              	; 禁止中断
	        push cs
	        pop  ds
	        mov  ax, 3509H                   	; ah = 35H 读取，al = 09H 中断向量； 读取09H号的中断向量
	        int  21H

	        mov  word ptr oldint, bx
	        mov  word ptr oldint + 2, es
	        mov  dx, offset kbin
	        mov  ax, 2509H                   	; ah = 35H 写入，al = 09H 中断向量； 写入09H号的中断向量
	        int  21H

	kbin:   push ax
	        push bx
	        push ds

	        push cs
	        pop  ds
	        sti
	        mov  bx, offset scantab
	        in   al, 60H
	        test al, 80H                     	; 1000 0000H
	        jnz  keyend
	        push ax
	        in   al, 61H
	        or   al, 80H
	        out  61H, al
	        and  al, 7FH
	        out  61H, al
	        pop  ax
	        cmp  al, 01H
	        jnz  disp
	        inc  flag

	disp:   test flag, 01H
	        jz   user
	        pop  ds
	        pop  bx
	        pop  ax
	        jmp  cs:oldint

	user:   xlat
	        cmp  al, 0
	        jz   keyend

	        mov  ah, 14
	        int  10H
	        mov  al, 0DH
	        int  10H
	        mov  al, 0AH
	        int  10H

	keyend: mov  al, 20H
	        out  20H, al

	        pop  ds
	        pop  bx
	        pop  ax
	        iret

code ENDS

end start