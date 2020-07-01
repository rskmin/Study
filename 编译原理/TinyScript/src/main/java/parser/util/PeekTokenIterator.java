package parser.util;

import common.PeekIterator;
import lexer.Token;
import lexer.TokenType;

import java.util.stream.Stream;

/**
 * Token流视察器
 */
public class PeekTokenIterator extends PeekIterator<Token> {

    public PeekTokenIterator(Stream<Token> stream) {
        super(stream);
    }

    /**
     * 检查下一个流中的符号是不是匹配一个值，并取出下一个符号
     * @param value
     * @return
     * @throws ParseException
     */
    public Token nextMatch(String value) throws ParseException {
        Token token = this.next();
        if (!token.getValue().equals(value)) {
            throw new ParseException(token);
        }
        return token;
    }

    /**
     * 检查下一个流中的符号是不是匹配一个类型，并取出下一个符号
     * @param type
     * @return
     * @throws ParseException
     */
    public Token nextMatch(TokenType type) throws ParseException {
        Token token = this.next();
        if (!token.getValue().equals(type)) {
            throw new ParseException(token);
        }
        return token;
    }
}
