const Enum = require('../../common/Enum')

module.exports = {
  BLOCK : new Enum('BLOCK', 1), // 代码块
  BINARY_EXPR : new Enum('BINARY_EXPR', 2),// 二项表达式 1+1
  UNARY_EXPR : new Enum('UNARY_EXPR', 3),// 一元表达式 ++a
  VARIABLE : new Enum('VARIABLE', 4),// 变量
  SCALAR : new Enum('SCALAR', 5),// 标量,值类型 1.0, true
  IF_STMT : new Enum('IF_STMT', 6),// if 语句
  WHILE_STMT : new Enum('WHILE_STMT', 7),// while 语句
  FOR_STMT : new Enum('FOR_STMT', 8),// for 语句
  ASSIGN_STMt : new Enum('ASSIGN_STMt', 9),// 赋值语句
  DECLARE_STMT : new Enum('DECLARE_STMT', 10),// 声明语句
  FUNCTION_DECLARE_STMT : new Enum('FUNCTION_DECLARE_STMT', 11)// 函数声明语句
}