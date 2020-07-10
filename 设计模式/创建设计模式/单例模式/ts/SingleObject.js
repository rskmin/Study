"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SingleObject = /** @class */ (function () {
    // 设置构造函数为 private， 这样该类就不会被实例化
    function SingleObject() {
    }
    // 获取唯一可用的对象
    SingleObject.getInstance = function () {
        return this.instance;
    };
    SingleObject.prototype.showMessage = function () {
        console.log('Hello World!');
    };
    // 创建 SingleObject 的一个对象
    SingleObject.instance = new SingleObject();
    return SingleObject;
}());
exports.default = SingleObject;
