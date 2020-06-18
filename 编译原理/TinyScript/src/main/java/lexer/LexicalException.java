package lexer;

public class LexicalException extends Exception {

    private String message;

    public LexicalException(char c) {
        message = String.format("Unexpected character %c", c);
    }
    public LexicalException(String _msg) {
        message = _msg;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
