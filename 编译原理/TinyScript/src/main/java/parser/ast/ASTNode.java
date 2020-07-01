package parser.ast;

import org.apache.commons.lang3.StringUtils;
import lexer.Token;

import java.util.ArrayList;
import java.util.List;

/**
 * 抽象语法树抽象节点
 */
public abstract class ASTNode {

    /* 父子节点 */
    protected ArrayList<ASTNode> children = new ArrayList<>();
    protected ASTNode parent;

    /* 关键信息 */
    protected Token lexeme;// 词法单元
    protected String label;// 备注
    protected ASTNodeTypes type;// 类型

    public ASTNode(ASTNode _parent) {
        this.parent = _parent;
    }
    public ASTNode(ASTNode _parent, ASTNodeTypes _type, String _label) {
        this.parent = _parent;
        this.type = _type;
        this.label = _label;
    }

    /**
     * 获取单个子节点
     * @param index
     * @return ASTNode
     */
    public ASTNode getChild(int index) {
        return this.children.get(index);
    }

    /**
     * 添加子节点
     * @param node
     */
    public void addChild(ASTNode node) {
        children.add(node);
    }

    /**
     * 获取词法单元
     * @return
     */
    public Token getLexeme() {
        return lexeme;
    }

    /**
     * 设置词法单元
     * @return
     */
    public void setLexeme(Token token) {
        this.lexeme = token;
    }

    /**
     * 获取子节点数组
     * @return
     */
    public List<ASTNode> getChildren() {
        return children;
    }

    /**
     * 设置类型
     * @param type
     */
    public void setType(ASTNodeTypes type) {
        this.type = type;
    }

    /**
     * 设置标签
     * @param label
     */
    public void setLabel(String label) {
        this.label = label;
    }

    /**
     * 以当前节点为根节点打印抽象语法树
     * @param indent
     */
    public void print(int indent) {
        System.out.println(StringUtils.leftPad(" ", indent * 2) + label);
        for (ASTNode child : children) {
            child.print(indent + 1);
        }
    }

}
