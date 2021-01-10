assume cs:code, ds:data, ss:stack

data SEGMENT USE16
	     db 128 dup(0)
data ENDS

stack SEGMENT USE16
	      db 128 dup(0)
stack ENDS

code SEGMENT USE16
	      ORG   100H
	VARW  DW    1234H, 5678H                               	; 100H~103H
	VARB  DB    3, 4                                       	; 104H~105H
	      ALIGN 4
	VARD  DD    12345678H                                  	; 108H~10BH
	      EVEN
	BUFF  DB    10 DUP(?)                                  	; 10CH~115H
	MESS  DB    'HELLO'                                    	; 116H~11AH
	BEGIN:MOV   AX, 21AH
	; cannot add two relocatable labels
	; 104H + 116H = 21AH, 但是由于无法相加所以题目错误
	      MOV   AX, TYPE BUFF + TYPE MESS + TYPE VARD
	; 1 + 1 + 4 = 6, AX = 0006H
	      MOV   AX, SIZEOF VARW + SIZEOF BUFF + SIZEOF MESS
	; 4 + 10 + 5 = 19 = 13H, AX = 0013H
	      MOV   AX, LENGTHOF VARW + LENGTHOF VARD
	; 2 + 1 = 3H, AX = 0003H
	      MOV   AX, LENGTHOF BUFF + SIZEOF VARW
	; 10 + 4 = EH, AX = 000EH
	      MOV   AX, TYPE BEGIN
	; AX = FFFFH
	      MOV   AX, OFFSET BEGIN
	; AX = 011BH
	      mov   ah, 4CH
	      int   21
code ENDS

end BEGIN