package lexer;

public class Token {
    TokenType _type;
    String _value;

    public Token(TokenType type, String value) {
        this._type = type;
        this._value = value;
    }

    public TokenType getType() {
        return  _type;
    }

    @Override
    public String toString() {
        return String.format("type %s, value %s", _type, _value);
    }

    /**
     * 是否是变量
     *
     * @return boolean
     */
    public boolean isVariable() {
        return _type == TokenType.VARIABLE;
    }

    /**
     * 是否是值类型
     *
     * @return boolean
     */
    public boolean isScalar() {
        return _type == TokenType.INTEGER || _type == TokenType.FLOAT ||
                _type == TokenType.STRING || _type == TokenType.BOOLEAN;
    }
}
