stack SEGMENT USE16
	      dw 512 DUP(?)	; 1024 个字节
stack ENDS

data SEGMENT USE16
	string db 'Hello, Everybody!', 0DH, 0AH, '$'
data ENDS

code SEGMENT USE16
	      assume cs:code, ds:data, ss:stack	; 假定cs,ds,ss的逻辑段
	start:mov    ax, data
	      mov    ds, ax
	      mov    dx, offset string         	; string 所在地址
        
	      mov    ah, 9
	      int    21H
	      mov    ax, 4c00H
	      int    21H
code ENDS
end start