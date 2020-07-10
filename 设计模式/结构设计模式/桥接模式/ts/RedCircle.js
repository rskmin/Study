"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 创建实现了 DrawAPI 接口的实体桥接实现类
var RedCircle = /** @class */ (function () {
    function RedCircle() {
    }
    RedCircle.prototype.drawCircle = function (radius, x, y) {
        console.log("Drawing Circle[ color: red, radius: " + radius + ", x: " + x + ", y: " + y + " ]");
    };
    return RedCircle;
}());
exports.default = RedCircle;
