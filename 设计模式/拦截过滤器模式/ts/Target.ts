/**
 * 请求处理程序
 */
export default class Target {
  execute(request: string): void {
    console.log(`Executing request: ${request}`)
  }
}
