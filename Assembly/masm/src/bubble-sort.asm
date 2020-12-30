assume cs:code, ds:data, ss:stack

data SEGMENT USE16
	BLOCK db 61H, 84H, 93H, 0C4H, 17H, 0FFH, 52H, 2AH	; num = 8
data ENDS

stack SEGMENT USE16
	      db 128 dup(0)
stack ENDS

code SEGMENT USE16
	start:      mov  ax, stack
	            mov  ss, ax
	            mov  sp, 128

	            mov  ax, data
	            mov  ds, ax
            
	            call bubble_sort

	            mov  ah, 4cH
	            int  21H

	; ===================================
	bubble_sort:mov  cx, 7
	            mov  di, 0

	bubbleSort: call pick_small
	            inc  di
	            loop bubbleSort

	            ret
              
	; ===================================
	pick_small: push cx
	            mov  cx, 7
	            sub  cx, di       	; 内循环次数
	            mov  si, 7

	pickSmall:  call cmp_two
	            dec  si
	            loop pickSmall
              
	            pop  cx
	            ret
	; ===================================
	cmp_two:    mov  dl, ds:[si-1]
	            cmp  dl, ds:[si]
	            ja   changeTwo
	            ret

	changeTwo:  xchg dl, ds:[si]
	            xchg dl, ds:[si-1]
	            ret

code ENDS

end start