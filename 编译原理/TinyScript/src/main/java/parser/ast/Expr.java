package parser.ast;

import lexer.Token;
import parser.util.ExprHOF;
import parser.util.ParseException;
import parser.util.PeekTokenIterator;
import parser.util.PriorityTable;

/**
 * 抽象语法树 - 表达式节点
 */
public class Expr extends ASTNode {

    private static PriorityTable table = new PriorityTable();

    public Expr(ASTNode _parent, ASTNodeTypes type, Token lexeme) {
        super(_parent);
        this.type = type;
        this.label = lexeme.getValue();
        this.lexeme = lexeme;
    }

    // left: E(k) -> E(k) op(k) E(k+1) | E(k+1)
    // right:
    //      E(k) -> E(k+1) E_(k)
    //          var e = new Expr(); e.left = E(k+1); e.op = op(k); e.right = E(k+1) E_(k)
    //      E_(k) -> op(k) E(k+1) E_(k) | ε
    // 最高优先级处理:
    //      E(t) -> F E_(k) | U E_(k)
    //          F: 因子, U: 一元表达式
    //      E_(t) -> op(t) E(t) E_(t) | ε

    /**
     * 递归处理表达式(右递归) - 将多重表达式(k)拆解为 最简表达式(k+1) 和 带运算符的多重表达式(k)
     * @param parent
     * @param k
     * @param it
     * @return
     * @throws ParseException
     */
    private static ASTNode E(ASTNode parent, int k, PeekTokenIterator it) throws ParseException {
        if (k < table.size() - 1) {
            return combine(parent, it, () -> E(parent, k+1, it), () -> E_(parent, k, it));
        } else {
            return race(
                    it,
                    () -> combine(parent, it, () -> U(parent, it), () -> E_(parent, k, it)),
                    () -> combine(parent, it, () -> F(parent, it), () -> E_(parent, k, it))
            );
        }
    }

    /**
     * 递归处理带运算符的多重表达式(右递归) -
     * @param parent
     * @param k
     * @param it
     * @return
     * @throws ParseException
     */
    private static ASTNode E_(ASTNode parent, int k, PeekTokenIterator it) throws ParseException {
        Token token = it.peek();
        String value = token.getValue();

        if (table.get(k).contains(value)) {
            Expr expr = new Expr(parent, ASTNodeTypes.BINARY_EXPR, it.nextMatch(value));
            expr.addChild(combine(parent, it,
                    () -> E(parent, k+1, it),
                    () -> E_(parent, k, it)
                    ));
            return expr;
        }
        return null;
    }

    private static ASTNode U(ASTNode parent, PeekTokenIterator it) throws ParseException {
        Token token = it.peek();
        String value = token.getValue();

        if (value.equals("(")) {
            it.nextMatch("(");
            ASTNode expr = E(parent, 0, it);
            it.nextMatch(")");
            return expr;
        } else if (value.equals("++") || value.equals("--") || value.equals("!")) {
            Token t = it.peek();
            it.nextMatch(value);
            Expr unaryExpr = new Expr(parent, ASTNodeTypes.UNARY_EXPR, t);
            unaryExpr.addChild(E(unaryExpr, 0, it));
            return unaryExpr;
        }
        return null;
    }

    private static ASTNode F(ASTNode parent, PeekTokenIterator it) {
        Token token = it.peek();
        if (token.isVariable()) {
            return new Variable(parent, it);
        } else {
            return new Scalar(parent, it);
        }
    }

    /**
     * 合并
     * @param parent
     * @param it
     * @param aFunc
     * @param bFunc
     * @return
     * @throws ParseException
     */
    private static ASTNode combine(ASTNode parent, PeekTokenIterator it, ExprHOF aFunc, ExprHOF bFunc) throws ParseException {
        ASTNode a = aFunc.hoc();
        if (a == null) {
            return it.hasNext() ? bFunc.hoc() : null;
        }
        ASTNode b = it.hasNext() ? bFunc.hoc() : null;
        if (b == null) {
            return a;
        }

        Expr expr = new Expr(parent, ASTNodeTypes.BINARY_EXPR, b.lexeme);
        expr.addChild(a);
        expr.addChild(b.getChild(0));
        return expr;
    }

    /**
     * 竞争
     * @param it
     * @param aFunc
     * @param bFunc
     * @return
     * @throws ParseException
     */
    private static ASTNode race(PeekTokenIterator it, ExprHOF aFunc, ExprHOF bFunc) throws ParseException {
        if (!it.hasNext()) {
            return null;
        }
        ASTNode a = aFunc.hoc();
        if (a != null) {
            return a;
        }
        return bFunc.hoc();
    }
}
