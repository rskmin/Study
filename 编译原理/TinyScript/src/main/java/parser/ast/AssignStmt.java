package parser.ast;

/**
 * 抽象语法树 - 赋值语句节点
 */
public class AssignStmt extends Stmt {
    public AssignStmt(ASTNode _parent) {
        super(_parent, ASTNodeTypes.ASSIGN_STMT, "assign");
    }
}
