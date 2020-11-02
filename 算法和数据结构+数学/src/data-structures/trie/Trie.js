const TrieNode = require('./TrieNode');

/** 默认根字符 */
const HEAD_CHARACTER = '*';

class Trie {
  /**
   * @param {string} [character] 根节点字符(*)
   */
  constructor(character = HEAD_CHARACTER) {
    /** @var 根节点 @type {TrieNode} */
    this.head = new TrieNode(character);
  }
  /**
   * 增加单词
   * @param {string} word 单词
   * @returns {Trie}
   */
  addWord(word) {
    const characters = Array.from(word);
    const len = characters.length;
    let currentNode = this.head;
    for (let charIndex = 0; charIndex < len; charIndex++) {
      const isComplete = charIndex === len - 1;
      currentNode = currentNode.addChild(characters[charIndex], isComplete);
    }
    return this;
  }
  /**
   * 删除单词
   * @param {string} word 单词
   * @returns {Trie}
   */
  deleteWord(word) {
    const len = word.length;
    /**
     * @param {TrieNode} currentNode
     * @param {number} charIndex 
     */
    const depthFirstDelete = (currentNode, charIndex = 0) => {
      if (charIndex >= len) return;
      const character = word[charIndex];
      const nextNode = currentNode.getChild(character);
      if (nextNode == null) return;
      depthFirstDelete(nextNode, charIndex + 1);
      charIndex === (len - 1) && (nextNode.isCompleteWord = false);
      currentNode.removeChild(character);
    }
    depthFirstDelete(this.head);
    return this;
  }
  /**
   * 获取单词最后的节点
   * @param {string} word 单词
   * @returns {TrieNode}
   */
  getLastCharacterNode(word) {
    const characters = Array.from(word);
    const len = characters.length;
    let currentNode = this.head;
    for (let charIndex = 0; charIndex < len; charIndex++) {
      if (!currentNode.hasChild(characters[charIndex])) return null;
      currentNode = currentNode.getChild(characters[charIndex]);
    }
    return currentNode;
  }
  /**
   * 检查单词是否存在
   * @param {string} word 单词
   * @returns {boolean}
   */
  doesWordExists(word) {
    const lastCharacter = this.getLastCharacterNode(word);
    return !!lastCharacter && lastCharacter.isCompleteWord;
  }
  /**
   * 检查子字符集
   * @param {string} word
   * @returns {string[]}
   */
  suggestNextCharacters(word) {
    const lastCharacter = this.getLastCharacterNode(word);
    if (!lastCharacter) return null;
    return lastCharacter.suggestChildren();
  }
}

module.exports = Trie;
