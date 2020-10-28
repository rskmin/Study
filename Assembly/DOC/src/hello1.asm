STACK SEGMENT STACK		; 定义堆栈段
	      DW 512 DUP(?)
STACK ENDS
DATA SEGMENT                             		; 定义数据段
	STRING DB 'Hello, Everybody!',0DH,0AH,'$'
DATA ENDS
CODE SEGMENT 'CODE'                  		;
	      ASSUME CS:CODE,DS:DATA,SS:STACK

	START:MOV    AX,DATA                 	; 对段寄存器赋初值
	      MOV    DS,AX

	      MOV    DX,OFFSET STRING        	; 输出内容
	      MOV    AH,9
	      INT    21H

	      MOV    AX,4C00H                	; 返回 dos
	      INT    21H
CODE ENDS
END START