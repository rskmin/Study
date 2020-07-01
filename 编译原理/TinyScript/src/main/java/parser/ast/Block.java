package parser.ast;

/**
 * 抽象语法树 - 代码块节点
 */
public class Block extends Stmt {
    public Block(ASTNode _parent) {
        super(_parent, ASTNodeTypes.BLOCK, "block");
    }
}
