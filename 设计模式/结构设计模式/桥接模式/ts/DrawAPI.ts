// 桥接实现接口
export default interface DrawAPI {
  drawCircle(radius: number, x: number, y: number): void
}