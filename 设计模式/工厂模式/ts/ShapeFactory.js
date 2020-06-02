"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Circle_1 = __importDefault(require("./Circle"));
var Rectangle_1 = __importDefault(require("./Rectangle"));
var Square_1 = __importDefault(require("./Square"));
var ShapeFactory = /** @class */ (function () {
    function ShapeFactory() {
    }
    ShapeFactory.prototype.getShape = function (shapeType) {
        if (shapeType === null) {
            return null;
        }
        shapeType = shapeType.toLocaleUpperCase();
        if (shapeType === 'CIRCLE') {
            return new Circle_1.default();
        }
        else if (shapeType === 'RECTANGLE') {
            return new Rectangle_1.default();
        }
        else if (shapeType === 'SQUARE') {
            return new Square_1.default();
        }
        return null;
    };
    return ShapeFactory;
}());
exports.default = ShapeFactory;
