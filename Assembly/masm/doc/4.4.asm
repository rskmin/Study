.model tiny
.code
.startup
  mov dx, offset string
  mov ah, 9
  int 21H

  mov ah, 01H ; 等待按键
  int 21

  mov ah, 02H ; 响铃
  mov dl, 07H
  int 21H
  
.exit 0
string db 'Press any key to continue!$'
end