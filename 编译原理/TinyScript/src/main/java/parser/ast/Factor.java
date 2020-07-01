package parser.ast;

import lexer.Token;
import lexer.TokenType;
import parser.util.PeekTokenIterator;

/**
 * 因子 - 操作符两边可以计算的内容
 */
public abstract class Factor extends ASTNode {
    public Factor(ASTNode _parent, PeekTokenIterator it) {
        super(_parent);
        Token token = it.next();
        TokenType type = token.getType();

        if (type == TokenType.VARIABLE) {
            this.type = ASTNodeTypes.VARIABLE;
        } else {
            this.type = ASTNodeTypes.SCALAR;
        }
        this.label = token.getValue();
        this.lexeme = token;
    }
}
