import Image from "./Image";
import RealImage from "./RealImage";

/**
 * 代理模式
 * 1、和适配器模式的区别：适配器模式主要改变所考虑对象的接口，而代理模式不能改变所代理类的接口。
 * 2、和装饰器模式的区别：装饰器模式为了增强功能，而代理模式是为了加以控制
 */

/**
 * 减少RealImage对象加载的内存占用，调用方法时才把对象调入内存
 */
export default class ProxyImage implements Image {
  private realImage?: RealImage
  private fileName: string

  constructor(fileName: string) {
    this.fileName = fileName
  }

  display() {
    if (this.realImage == null) {
      this.realImage = new RealImage(this.fileName)
    }
    this.realImage.display()
  }
}