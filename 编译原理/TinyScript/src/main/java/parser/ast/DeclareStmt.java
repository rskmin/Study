package parser.ast;

/**
 * 抽象语法树 - 声明语句节点
 */
public class DeclareStmt extends Stmt {
    public DeclareStmt(ASTNode _parent) {
        super(_parent, ASTNodeTypes.DECLARE_STMT, "declare");
    }
}
