"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ShapeDecorator = /** @class */ (function () {
    function ShapeDecorator(decoratedShape) {
        this.decoratedShape = decoratedShape;
    }
    ShapeDecorator.prototype.draw = function () {
        this.decoratedShape.draw();
    };
    return ShapeDecorator;
}());
exports.default = ShapeDecorator;
