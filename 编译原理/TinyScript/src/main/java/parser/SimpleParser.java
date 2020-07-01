package parser;

import parser.ast.ASTNode;
import parser.ast.ASTNodeTypes;
import parser.ast.Expr;
import parser.ast.Scalar;
import parser.util.ParseException;
import parser.util.PeekTokenIterator;

public class SimpleParser {
    // Expr -> digit + Expr | digit
    // digit -> 0|1|2|3|4|5|...|9
    public static ASTNode parse(PeekTokenIterator it) throws ParseException {

        Expr expr = new Expr(null);
        Scalar scalar = new Scalar(expr, it);
        if (!it.hasNext()) {
            return scalar;
        }

        expr.addChild(scalar);
        expr.setLexeme(it.peek());
        it.nextMatch("+");
        expr.setLabel("+");
        expr.setType(ASTNodeTypes.BINARY_EXPR);
        ASTNode rightNode = parse(it);
        expr.addChild(rightNode);
        return expr;
    }
}
