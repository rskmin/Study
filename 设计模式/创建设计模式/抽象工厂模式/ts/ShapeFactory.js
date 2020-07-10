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
var AbstractFactory_1 = __importDefault(require("./AbstractFactory"));
var Circle_1 = __importDefault(require("./Circle"));
var Rectangle_1 = __importDefault(require("./Rectangle"));
var Square_1 = __importDefault(require("./Square"));
var ShapeFactory = /** @class */ (function (_super) {
    __extends(ShapeFactory, _super);
    function ShapeFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShapeFactory.prototype.getShape = function (shapeType) {
        if (shapeType == null) {
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
    ShapeFactory.prototype.getColor = function (color) {
        return null;
    };
    return ShapeFactory;
}(AbstractFactory_1.default));
exports.default = ShapeFactory;
