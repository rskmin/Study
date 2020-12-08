assume cs:code

; 123 * 236，结果存放在ax中
code SEGMENT USE16

  mov ax, 0

  mov cx, 123 ; 设置循环次数

  addNumber:add ax, 236
  loop addNumber

  mov ax, 4c00H
  int 21
code ENDS

end