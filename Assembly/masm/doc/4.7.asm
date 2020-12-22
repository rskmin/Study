.model small
.stack 256
.data
Person STRUCT
  number    dw 0
  pname     db '--------'
  sex       db 0
  birthday  db 'MM/DD/YYYY'
Person ENDS
array Person 100 dup(<>) ; 分配100个空白结构

.code
.startup
  mov bx, offset array
  mov ax, 1
  sub si, si ; si = 0
  mov cx, length array ; cx = 100
  mov dx, type array ; dx = 21
  again: mov [bx+si].Person.number, ax
  inc ax
  add si, dx
  loop again
.exit 0
end