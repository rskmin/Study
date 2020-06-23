import Context from './Context'

export default interface State {
  // 转换状态
  doAction(context: Context): void
}