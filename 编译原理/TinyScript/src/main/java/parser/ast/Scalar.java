package parser.ast;

import parser.util.PeekTokenIterator;

/**
 * 抽象语法树 - 标量节点
 */
public class Scalar extends Factor {
    public Scalar(ASTNode _parent, PeekTokenIterator it) {
        super(_parent, it);
    }
}
