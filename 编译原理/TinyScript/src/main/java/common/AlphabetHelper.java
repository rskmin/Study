package common;

import java.util.regex.Pattern;

public class AlphabetHelper {

    static Pattern ptnLetter = Pattern.compile("^[a-zA-Z]$");// 字母
    static Pattern ptnNumber = Pattern.compile("^[0-9]$");// 数字
    static Pattern ptnLiteral = Pattern.compile("^[_a-zA-z0-9]$");// 文本
    static Pattern ptnOperator = Pattern.compile("^[+-\\\\*<>=!&|^%/]$");// 运算符

    /**
     * 判断是否是字母
     * @param c char
     * @return boolean
     */
    public static boolean isLetter(char c) {
        return ptnLetter.matcher(c + "").matches();
    }

    /**
     * 判断是否是数字
     * @param c char
     * @return boolean
     */
    public static boolean isNumber(char c) {
        return ptnNumber.matcher(c + "").matches();
    }

    /**
     * 判断是否是文本
     * @param c char
     * @return boolean
     */
    public static boolean isLiteral(char c) {
        return ptnLiteral.matcher(c + "").matches();
    }

    /**
     * 判断是否是运算符
     * @param c char
     * @return boolean
     */
    public static boolean isOperator(char c) {
        return ptnOperator.matcher(c + "").matches();
    }
}
