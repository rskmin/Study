import DrawAPI from "./DrawAPI";

// 创建实现了 DrawAPI 接口的实体桥接实现类
export default class GreenCircle implements DrawAPI {
  drawCircle(radius: number, x: number, y: number): void {
    console.log(`Drawing Circle[ color: green, radius: ${radius}, x: ${x}, y: ${y} ]`)
  }
}