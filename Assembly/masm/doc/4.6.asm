
dseg SEGMENT USE16
	      org 100H
	      dw  200 dup(?)
	topsp equ this word
	array dw  100 dup(5868H)
dseg ENDS

cseg SEGMENT USE16
	      assume cs:cseg,ds:dseg,ss:dseg
	start:mov    ax, dseg
	      mov    ds, ax

	      mov    ss, ax
	      mov    sp, offset topsp

	      mov    cx, 100
	      xor    si, si                 	; si = 0
	again:push   array[si]
	      add    si, 2
	      loop   again

	      mov    ah, 4cH
	      int    21H
cseg ENDS

end start