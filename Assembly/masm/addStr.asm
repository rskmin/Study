assume cs:code

; 将地址为 FFFF:0 到 FFFF:F 的字节型数据的和结果存放在 dx 中
code SEGMENT USE16
  
	          mov  ax, 0FFFFH
	          mov  ds, ax
	          mov  bx, 0
	          mov  dx, 0
	          mov  cx, 16

	          mov  ax, 0

	addNumber:mov  al, ds:[bx]
	          add  dx, ax
	          inc  bx
	          loop addNumber
  

	          mov  ax, 4c00H
	          int  21
code ENDS

end