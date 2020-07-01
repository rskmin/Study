package parser.ast;

public enum ASTNodeTypes {
    BLOCK, // 代码块
    BINARY_EXPR,// 二项表达式 1+1
    UNARY_EXPR,// 一元表达式 ++a
    VARIABLE,// 变量
    SCALAR,// 标量,值类型 1.0, true
    IF_STMT,// if 语句
    WHILE_STMT,// while 语句
    FOR_STMT,// for 语句
    ASSIGN_STMT,// 赋值语句
    DECLARE_STMT,// 声明语句
    FUNCTION_DECLARE_STMT// 函数声明语句
}
