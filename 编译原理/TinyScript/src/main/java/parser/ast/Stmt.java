package parser.ast;

/**
 * 抽象语法树抽象声明节点
 */
public abstract class Stmt extends ASTNode {
    public Stmt(ASTNode _parent, ASTNodeTypes _type, String _label) {
        super(_parent, _type, _label);
    }
}
