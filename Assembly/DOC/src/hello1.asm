STACK SEGMENT STACK
	      DW 512 DUP(?)
STACK ENDS
DATA SEGMENT
	STRING DB 'Hello, Everybody!',0DH,0AH,'$'
DATA ENDS
CODE SEGMENT 'CODE'
	      ASSUME CS:CODE,DS:DATA,SS:STACK

	START:MOV    AX,DATA
	      MOV    DS,AX
	      MOV    DX,OFFSET STRING

	      MOV    AH,9
	      INT    21H
	      MOV    AX,4C00H
	      INT    21H
CODE ENDS
END START