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
var Red_1 = __importDefault(require("./Red"));
var Green_1 = __importDefault(require("./Green"));
var Blue_1 = __importDefault(require("./Blue"));
var ColorFactory = /** @class */ (function (_super) {
    __extends(ColorFactory, _super);
    function ColorFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColorFactory.prototype.getShape = function (shapeType) {
        return null;
    };
    ColorFactory.prototype.getColor = function (colorType) {
        if (colorType == null) {
            return null;
        }
        colorType = colorType.toLocaleUpperCase();
        if (colorType === 'RED') {
            return new Red_1.default();
        }
        else if (colorType === 'GREEN') {
            return new Green_1.default();
        }
        else if (colorType === 'BLUE') {
            return new Blue_1.default();
        }
        return null;
    };
    return ColorFactory;
}(AbstractFactory_1.default));
exports.default = ColorFactory;
