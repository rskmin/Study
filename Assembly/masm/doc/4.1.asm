.MODEL SMALL ; 定义程序的存储模式，小型程序一般采用小模式
.STACK ; 定义堆栈段
.DATA ;定义数据段
  STRING DB 'Hello, Everybody!', 0DH, 0AH, '$'

.CODE ; 定义代码段

.STARTUP ; 说明程序的起始位置
  MOV DX, OFFSET STRING ;
  MOV AH, 9
  INT 21H ; 利用DOS功能调用显示信息

.EXIT 0 ; 程序结束点，返回DOS

END ; 汇编结束