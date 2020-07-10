"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Circle_1 = __importDefault(require("./Circle"));
const Square_1 = __importDefault(require("./Square"));
const Rectangle_1 = __importDefault(require("./Rectangle"));
class ShapeCache {
    static getShape(shapeId) {
        const cachedShape = this.shapeMap.get(shapeId);
        return cachedShape.clone();
    }
    static loadCache() {
        const circle = new Circle_1.default();
        circle.setId('1');
        this.shapeMap.set(circle.getId(), circle);
        const square = new Square_1.default();
        square.setId('2');
        this.shapeMap.set(square.getId(), square);
        const rectangle = new Rectangle_1.default();
        rectangle.setId('3');
        this.shapeMap.set(rectangle.getId(), rectangle);
    }
}
exports.default = ShapeCache;
ShapeCache.shapeMap = new Map();
