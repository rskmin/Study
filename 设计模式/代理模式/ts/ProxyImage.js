"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var RealImage_1 = __importDefault(require("./RealImage"));
/**
 * 代理模式
 * 1、和适配器模式的区别：适配器模式主要改变所考虑对象的接口，而代理模式不能改变所代理类的接口。
 * 2、和装饰器模式的区别：装饰器模式为了增强功能，而代理模式是为了加以控制
 */
/**
 * 减少RealImage对象加载的内存占用，调用方法时才把对象调入内存
 */
var ProxyImage = /** @class */ (function () {
    function ProxyImage(fileName) {
        this.fileName = fileName;
    }
    ProxyImage.prototype.display = function () {
        if (this.realImage == null) {
            this.realImage = new RealImage_1.default(this.fileName);
        }
        this.realImage.display();
    };
    return ProxyImage;
}());
exports.default = ProxyImage;
