const HashTable = require('../hash-table/HashTable');

/**
 * 字典树
 */
class TrieNode {
  /**
   * @param {string} character 当前字符
   * @param {boolean} isCompleteWord 是否是完整单词
   */
  constructor(character, isCompleteWord = false) {
    this.character = character;
    this.isCompleteWord = isCompleteWord;
    this.children = new HashTable();
  }
  /**
   * @param {string} character 指定字符
   * @returns {TrieNode|null}
   */
  getChild(character) {
    return this.children.get(character);
  }
  /**
   * 添加节点
   * @param {string} character 指定字符
   * @param {*} isCompleteWord 是否是完整单词
   * @returns {TrieNode}
   */
  addChild(character, isCompleteWord = false) {
    !this.children.has(character) && this.children.set(character, new TrieNode(character, isCompleteWord));
    const childNode = this.getChild(character);
    childNode.isCompleteWord = childNode.isCompleteWord || isCompleteWord;
    return childNode;
  }
  /**
   * 检查当前节点是否有指定子字符串
   * @param {string} character 指定字符串
   * @returns {boolean}
   */
  hasChild(character) {
    return this.children.has(character);
  }
  /**
   * 检查当前节点是否有子元素
   * @returns {boolean}
   */
  hasChildren() {
    return this.children.getKeys().length !== 0;
  }
  /**
   * 删除指定字符串
   * @param {string} character 指定字符串
   */
  removeChild(character) {
    const childNode = this.getChild(character);
    if (
      childNode
      && !childNode.isCompleteWord
      && !childNode.hasChildren()
    ) {
      this.children.delete(character);
    }
    return this;
  }
  /**
   * 显示子字符集
   * @returns {string[]}
   */
  suggestChildren() {
    return this.children.getKeys();
  }
  /**
   * @returns {string}
   */
  toString() {
    let childrenAsString = this.suggestChildren().toString();
    childrenAsString = childrenAsString ? `:${childrenAsString}` : '';
    const isCompleteString = this.isCompleteWord ? '*' : '';
    return `${this.character}${isCompleteString}${childrenAsString}`;
  }
}

module.exports = TrieNode;