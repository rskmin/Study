package parser.util;

import parser.ast.ASTNode;

// HOF: High order function - 高阶函数
@FunctionalInterface
public interface ExprHOF {

    ASTNode hoc() throws ParseException;
}
