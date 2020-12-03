assume cs:code

;将内存 FFFF:0 ~ FFFF:F 内存单元中的数据复制到 0:200 ～ 0:20F
; == 20H:0 ~ 20H:F
code SEGMENT USE16

	          mov  ax, 0FFFFH
	          mov  ds, ax

            mov  ax, 20H
            mov  es, ax

	          mov  cx, 8

	setNumber:push ds:[bx]
            pop es:[bx]
            add bx, 2
	          loop setNumber

	          mov  ax, 4c00H
	          int  21
code ENDS
end