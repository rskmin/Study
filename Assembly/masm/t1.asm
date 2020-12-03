assume cs:code ; 将cs ip指向程序段起始地址

; 程序段
code SEGMENT USE16
	mov bx, 10H
	mov al, ds:[bx]

	add bx, 1
	mov al, ds:[bx]

	add bx, 1
	mov al, ds:[bx]

	mov ax, 4c00H
	int 21
code ENDS

end