assume cs:code, ds:data

data SEGMENT USE16
	     db 'BaSie'
	     db 'iNFOrMaTiOn'
data ENDS

code SEGMENT USE16
	start:      mov  bx, data
	            mov  ds, bx

	            mov  bx, 0
	            mov  cx, 5

	toUpperCase:mov  al, ds:[bx]
	            and  al, 11011111B
	            mov  ds:[bx], al
	            inc  bx
	            loop toUpperCase

	            mov  cx, 11
	toLowerCase:mov  al, ds:[bx]
	            or   al, 00100000B
	            mov  ds:[bx], al
	            inc  bx
	            loop toLowerCase

	            mov  ah, 4cH
	            int  21H
code ENDS

end start