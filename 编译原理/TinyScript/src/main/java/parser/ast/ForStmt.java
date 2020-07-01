package parser.ast;

/**
 * 抽象语法树 - for语句节点
 */
public class ForStmt extends Stmt {
    public ForStmt(ASTNode _parent) {
        super(_parent, ASTNodeTypes.FOR_STMT, "for");
    }
}
