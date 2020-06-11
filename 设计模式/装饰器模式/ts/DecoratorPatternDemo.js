"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Circle_1 = __importDefault(require("./Circle"));
var RedShapeDecorator_1 = __importDefault(require("./RedShapeDecorator"));
var Rectangle_1 = __importDefault(require("./Rectangle"));
var circle = new Circle_1.default();
var redCircle = new RedShapeDecorator_1.default(new Circle_1.default);
var RedRectangle = new RedShapeDecorator_1.default(new Rectangle_1.default());
console.log('Circle with normal border');
circle.draw();
console.log('Circle of red border');
redCircle.draw();
console.log('Rectangle of red border');
RedRectangle.draw();
