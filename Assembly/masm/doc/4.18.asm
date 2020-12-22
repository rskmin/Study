.model small
.stack
.data
  qvar dq 1234567887654321H
.code
.startup
  mov al, byte ptr qvar[6]
  mov byte ptr qvar[7], al
  mov al, byte ptr qvar[5]
  mov byte ptr qvar[6], al
  mov al, byte ptr qvar[4]
  mov byte ptr qvar[5], al
  mov al, byte ptr qvar[3]
  mov byte ptr qvar[4], al
  mov al, byte ptr qvar[2]
  mov byte ptr qvar[3], al
  mov al, byte ptr qvar[1]
  mov byte ptr qvar[2], al
  mov al, byte ptr qvar[0]
  mov byte ptr qvar[1], al
  mov byte ptr qvar[0], al
.exit 0
end