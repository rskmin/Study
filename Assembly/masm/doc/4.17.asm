.model small
.stack
.data
  X   db 8cH
  Y   db 64H
  Z   db ?

.code

.startup
  mov al, X
  add al, Y
  mov ah, 00H
  adc ah, 00H
  mov bl, 2
  div bl
  mov Z, al

.exit 0

end