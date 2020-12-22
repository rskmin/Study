; 将两个数据段 data1 和 data2 合并在一个 datagroup 中

stackseg SEGMENT USE16
	         db 256 dup(?)
stackseg ENDS

data1 SEGMENT USE16
	const1 dw 100
data1 ENDS

data2 SEGMENT USE16
	var1  dw ?
data2 ENDS

datagroup GROUP data1, data2 ; 组合

codeseg SEGMENT para public 'CODE'                		; 代码段

	        assume cs:codeseg,ds:datagroup,ss:stackseg
	start:  mov    ax, datagroup
	        mov    ds, ax

	        mov    ax, const1                         	; ax = 100
	        mov    var1, ax                           	; var1 = 100
	        mov    ax, offset var1
	        mov    ax, offset data1
	        mov    ax, offset data2

	        assume ds:data2
	        mov    ax, data2                          	; ax = 100
	        mov    ds, ax                             	; ds = 100
	        mov    ax, var1                           	; ax = 100
	        mov    ax, offset var1
	        mov    ax, 4c00H
	        int    21

codeseg ENDS
end start