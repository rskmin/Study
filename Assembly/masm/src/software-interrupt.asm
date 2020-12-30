assume cs:code, ds:data, ss:stack

data SEGMENT USE16
	ASCADDR db '0123456789'
	LEN     =  $ - ASCADDR   	; 10
	NUMBER  db LEN
	BCDADDR db LEN dup(?)
data ENDS

stack SEGMENT USE16
	      db 128 dup(0)
stack ENDS

code SEGMENT USE16
	start:  mov  ax, seg asc_bcd
	        mov  ds, ax            	; 设置中断服务的段基址
	        mov  dx, offset asc_bcd	; 设置中断服务的偏移地址
	        mov  ax, 2578H         	; AH = 25H : DOS中断功能号，AL = 78H : 中断类型码
	        int  21H

	        int  78H               	; 调用中断类型码为78H的中断
	        retf

asc_bcd proc
	        mov  ax, data
	        mov  ds, ax

	        mov  si, offset ASCADDR
	        mov  di, offset BCDADDR

	        mov  ch, NUMBER        	; ch = 0AH
	        shr  ch, 1             	; ch = 05H
	        mov  cl, 4             	; cl = 04H
	; cx = 0504H

	ascBcd: mov  ax, ds:[si]
	        and  al, 00001111B
	        shl  ah, cl
	        or   al, ah
	        mov  ds:[di], al
	        add  si, 2
	        inc  di
	        dec  ch
	        jnz  ascBcd

	        iret
asc_bcd endp
	
code ENDS

end start