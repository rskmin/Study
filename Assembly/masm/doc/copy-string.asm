assume cs:code, ds:data

;description
data SEGMENT USE16
	     db 'welcome to masm!'
	     db '................'
data ENDS


;description
code SEGMENT USE16
	start:     mov  ax, data
	           mov  ds, ax

	           mov  si, 0

	           mov  cx, 8
        
	copyString:mov  ax, ds:[si]
	           mov  ds:[si+16], ax
	           add  si, 2
	           loop copyString

	           mov  ah, 4cH
	           int  21H
code ENDS

end start