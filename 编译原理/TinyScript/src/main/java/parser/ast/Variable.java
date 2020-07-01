package parser.ast;

import parser.util.PeekTokenIterator;

/**
 * 抽象语法树 - 变量节点
 */
public class Variable extends Factor {
    public Variable(ASTNode _parent, PeekTokenIterator it) {
        super(_parent, it);
    }
}
