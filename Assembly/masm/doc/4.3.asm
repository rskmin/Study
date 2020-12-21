.model small
.stack
.data
  v_byte equ this byte ; v_byte 是字节类型的变量，但与变量v_word地址相同
  v_word dw 3332H, 3735H
  target dw 5 dup(20H)
  crlf   db 0DH, 0AH, '$' ; 结束输出标记
  flag   db 0

.code

.startup
  mov al, byte ptr v_word ; al = 32H
  dec al ; al = 31H
  mov v_byte, al ; 对v_word的第一个字节操作
  ; 3331H, 3735H

  n_label:  cmp flag, 1
            jz s_label ; fleag单元为1，则转移
            inc flag
            jmp short n_label ; 段转移

  s_label:  cmp flag, 2
            jz next ; flag 单元为2转移
            inc flag
            jmp s_label

  next:     mov ax, type v_word ; 汇编结果为 mov ax, 2
            mov cx, length target ; 汇编结果为 mov cx, 5
            mov si, offset target

  ; cx = 5
  w_again:  mov [si], ax
            inc si
            inc si
            loop w_again
            ; cx = 0
            mov cx, size target ; 汇编结果为 mov cx, 0aH
            mov al, '?'
            mov di, offset target

  ; al = '?', cx = 0AH = 10
  b_again:  mov [di], al
            inc di
            loop b_again
            mov dx, offset v_word
            mov ah, 9
            int 21H

.exit 0
end