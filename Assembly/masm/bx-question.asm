assume cs:code

;description
code SEGMENT USE16
  
  mov ax, 2000H ; ax 2000H
  mov ds, ax ; ds 2000H
  mov bx, 1000H ; bx 1000H

  mov ax, ds:[bx] ; ax 00BE
  inc bx ; bx 1001H
  inc bx ; bx 1002H

  mov ds:[bx], ax
  inc bx
  inc bx

  mov ds:[bx], ax
  inc bx

  mov ds:[bx], al
  inc bx

  mov ds:[bx], al

  mov ax 4c00H
  int 21
code ENDS

ends