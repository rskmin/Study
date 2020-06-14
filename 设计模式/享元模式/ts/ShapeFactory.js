"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Circle_1 = __importDefault(require("./Circle"));
class ShapeFactory {
    static getCircle(color) {
        let circle = this.circleMap.get(color);
        if (circle == null) {
            circle = new Circle_1.default(color);
            this.circleMap.set(color, circle);
            console.log(`Create circle of color: ${color}`);
        }
        return circle;
    }
}
exports.default = ShapeFactory;
ShapeFactory.circleMap = new Map();
