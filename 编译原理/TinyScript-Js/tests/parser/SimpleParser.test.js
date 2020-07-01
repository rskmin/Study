const SimpleParser = require('../../src/parser/SimpleParser')
const Lexer = require('../../src/lexer/Lexer')
const getGenerator = require('../../src/common/getGenerator')
const PeekTokenIterator = require('../../src/parser/util/PeekTokenIterator')
const { assert } = require('chai')

describe('SimpleParser', () => {
  it('basic', () => {
    const source = '1+2+3+4'
    const lexer = new Lexer()
    const tokens = lexer.analyse(getGenerator([...source]))
    const tokenIt = new PeekTokenIterator(getGenerator(tokens))
    const expr = SimpleParser.parse(tokenIt)

    assert.equal(expr.children.length, 2)

    assert.equal(expr.getLexeme().getValue(), '+')
    const v1 = expr.getChild(0)
    assert.equal(v1.getLexeme().getValue(), '1')

    const e2 = expr.getChild(1)
    assert.equal(e2.getLexeme().getValue(), '+')
    const v2 = e2.getChild(0)
    assert.equal(v2.getLexeme().getValue(), '2')

    const e3 = e2.getChild(1)
    assert.equal(e3.getLexeme().getValue(), '+')
    const v3 = e3.getChild(0)
    assert.equal(v3.getLexeme().getValue(), '3')

    const v4 = e3.getChild(1)
    assert.equal(v4.getLexeme().getValue(), '4')

    expr.print()
    
  })
})