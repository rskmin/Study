assume cs:code

;向内存 0:200 ～ 0:23F 依次传送数据 0 ～ 63
code SEGMENT USE16

	          mov  ax, 20H
	          mov  es, ax

	          mov  cx, 64
	          mov  bx, 0

            mov dl, 0

	setNumber:mov  es:[bx], dl
	          inc  bx
	          inc  dl
	          loop setNumber
  
	          mov  ax, 4c00H
	          int  21
code ENDS