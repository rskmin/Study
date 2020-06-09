"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Shape_1 = __importDefault(require("./Shape"));
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(x, y, radius, drawAPI) {
        var _this = _super.call(this, drawAPI) || this;
        _this.x = x;
        _this.y = y;
        _this.radius = radius;
        return _this;
    }
    Circle.prototype.draw = function () {
        this.drawAPI.drawCircle(this.radius, this.x, this.y);
    };
    return Circle;
}(Shape_1.default));
exports.default = Circle;
