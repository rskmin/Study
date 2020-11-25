assume cs:code

; 程序段
code SEGMENT
	; 设置栈地址并分配大小
	     mov  ax, 2000H	; ax == 2000H
	     mov  ss, ax   	; ss == 2000H
	     mov  sp, 0    	; sp == 0
	     add  sp, 10H  	; sp == 10H

	; 调换栈中数据的位置
	     pop  ax       	; sp == 10H + 2H == 12H
	     pop  bx       	; sp == 12H + 2H == 14H
	     push ax       	; sp == 14H - 2H == 12H
	     push bx       	; sp == 12H - 2H == 10H

	     pop  ax       	; sp == 10H + 2H == 12H
	     pop  bx       	; sp == 12H + 2H == 14H

	; 退出程序
	     mov  ax, 4c00H
	     INT  21H

code ENDS

end