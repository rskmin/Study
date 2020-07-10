"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ShapeFactory_1 = __importDefault(require("./ShapeFactory"));
const colors = ['Red', 'Green', 'Blue', 'White', 'Black'];
for (let i = 0; i < 20; i++) {
    const circle = ShapeFactory_1.default.getCircle(getRandomColor());
    circle.setX(getRandomX());
    circle.setY(getRandomY());
    circle.setRadius(100);
    circle.draw();
}
function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}
function getRandomX() {
    return Math.floor(Math.random() * 100);
}
function getRandomY() {
    return Math.floor(Math.random() * 100);
}
