assume cs:code, ds:data, ss:stack

data SEGMENT USE16
       db 128 dup(0)
data ENDS

stack SEGMENT USE16
       db 128 dup(0)
stack ENDS

code SEGMENT USE16
  start:mov ax, stack
        mov ss, ax
        mov sp, 128

        mov ax, data
        mov ds, ax

        

        mov ah, 4cH
        int 21H
code ENDS

end start