; 输入数据段代码
DATAS SEGMENT
	X     DB 'a', -5
	      DB 2 DUP (100),?
	Y     DB 'ABC'
DATAS ENDS

; 输入堆栈段代码
STACKS SEGMENT USE16
  
STACKS ENDS

CODE SEGMENT 'CODE'                  		;
	      ASSUME CS:CODE,DS:DATA,SS:STACK

	START:MOV    AX,DATA                 	; 对段寄存器赋初值
	      MOV    DS,AX

	; 输入代码段
	      MOV    AL, X
	      DEC    X+1
	      MOV    Y, AL


	      MOV    AX,4C00H                	; 返回 dos
	      INT    21H
CODE ENDS
END START