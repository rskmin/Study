package parser.ast;

/**
 * 抽象语法树 - if 语句节点
 */
public class IfStmt extends Stmt {
    public IfStmt(ASTNode _parent) {
        super(_parent, ASTNodeTypes.IF_STMT, "if");
    }
}
