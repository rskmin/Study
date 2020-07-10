"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 创建实现了 DrawAPI 接口的实体桥接实现类
var GreenCircle = /** @class */ (function () {
    function GreenCircle() {
    }
    GreenCircle.prototype.drawCircle = function (radius, x, y) {
        console.log("Drawing Circle[ color: green, radius: " + radius + ", x: " + x + ", y: " + y + " ]");
    };
    return GreenCircle;
}());
exports.default = GreenCircle;
