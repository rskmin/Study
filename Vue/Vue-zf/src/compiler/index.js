import { parseHTML } from './parse'
import { generate } from './generate'

/**
 * 将HTML模板解析成render函数
 * @param {*} template - HTML模板
 */
export function compileToFunctions(template) {
  // 将模板解析成ast树
  let ast = parseHTML(template)
  // 1. 通过ast生成代码

  // 2. 优化静态节点

  // 3. 通过AST树 生成代码
  let code = generate(ast)

  //4 . 将字符串变成函数
  let render = new Function(`with (this) { return ${code} }`)
  return render
}
