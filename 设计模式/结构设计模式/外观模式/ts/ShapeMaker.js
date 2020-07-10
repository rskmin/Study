"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Circle_1 = __importDefault(require("./Circle"));
var Rectangle_1 = __importDefault(require("./Rectangle"));
var Square_1 = __importDefault(require("./Square"));
var ShapeMaker = /** @class */ (function () {
    function ShapeMaker() {
        this.circle = new Circle_1.default();
        this.rectangle = new Rectangle_1.default();
        this.square = new Square_1.default();
    }
    ShapeMaker.prototype.drawCircle = function () {
        this.circle.draw();
    };
    ShapeMaker.prototype.drawRectangle = function () {
        this.rectangle.draw();
    };
    ShapeMaker.prototype.drawSquare = function () {
        this.square.draw();
    };
    return ShapeMaker;
}());
exports.default = ShapeMaker;
