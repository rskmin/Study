assume cs:code, ds:data, ss:stack

data SEGMENT USE16
	COUNT  db 100
	TENH   db '2'
	HOUR   db '3'
	       db ':'
	TENM   db '5'
	MINUTE db '9'
	       db ':'
	TENS   db '5'
	SECOND db '0', 0DH, 0AH, '$'
data ENDS

stack SEGMENT USE16
	      db 128 dup(0)
stack ENDS

code SEGMENT USE16
start proc far
	        push  ds
	        mov   ax, 0
	        push  ax
	        mov   ah, 01H
	        int   21H
	        cli
	        cld
	        mov   ax, 0000H
	        mov   ds, ax
	        mov   si, 0020H
	        lodsw
	        mov   bx, ax
	        lodsw
	        push  ax
	        push  bx
	        mov   ax, data
	        mov   ds, ax
	        mov   ax, 0000H
	        mov   es, ax
	        mov   di, 0020H
	        mov   ax, offset timer
	        stosw
	        mov   ax, cs
	        stosw
	        mov   al, 00110110B
	        out   43H, al
	        mov   ax, 11932
	        out   40H, al
	        mov   al, ah
	        out   40H, al
	        in    al, 21H
	        push  ax
	        mov   al, 0FCH
	        out   21H, al
	        sti
	forever:mov   dl, 0FFH
	        mov   ah, 06H
	        int   21
	        jz    disp
	        cmp   al, 20H
	        jz    exit
	disp:   mov   dx, offset TENH
	        mov   ah, 09H
	        int   21H
	        mov   al, SECOND
	waitcha:cmp   al, SECOND
	        jz    waitcha
	        jmp   forever
	exit:   cli
	        cld
	        pop   ax
	        out   21H, al
	        mov   al, 36H
	        out   43H, al
	        mov   al, 0
	        out   40H, al
	        out   40H, al
	        mov   ax, 0
	        mov   es, ax
	        mov   di, 48
	        pop   ax
	        stosw
	        pop   ax
	        stosw
	        sti
	        ret

timer proc far
	        push  ax
	        dec   COUNT
	        jnz   l2
	        mov   COUNT, 100
	        inc   SECOND
	        cmp   SECOND, '9'
	        jle   TIMEXT
	        mov   SECOND, '0'
	        inc   TENS
	        cmp   TENS, '6'
	        JL    TIMEXT
	        mov   TENS, '0'
	        inc   MINUTE
	        cmp   MINUTE, '9'
	        jle   TIMEXT
	        mov   MINUTE, '0'
	        inc   TENM
	        cmp   TENM, '6'
	        jl    timer
	        mov   TENM, '0'
	        JMP   l3
	l2:     jmp   TIMEXT
	l3:     mov   al, HOUR
	        and   al, 0FH
	        mov   ah, TENH
	        and   ah, 0FH
	        mov   cl, 4
	        rol   ah, cl
	        or    al, ah
	        add   al, 1
	        daa
	        cmp   al, 24
	        jl    l1
	        mov   TENH, '0'
	        mov   HOUR, '0'
	        jmp   TIMEXT
	l1:     mov   ah, al
	        and   al, 0FH
	        or    al, 30H
	        mov   HOUR, al
	        mov   cl, 4
	        ror   ah, cl
	        and   ah, 0FH
	        or    ah, 30H
	        mov   TENH, 0AH
	TIMEXT: mov   al, 20H
	        out   20H, al
	        pop   ax
	        iret
timer endp

start endp

code ENDS

end start