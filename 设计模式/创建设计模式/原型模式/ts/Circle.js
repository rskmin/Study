"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Shape_1 = __importDefault(require("./Shape"));
class Circle extends Shape_1.default {
    constructor() {
        super();
        this.type = 'Circle';
    }
    draw() {
        console.log('Inside Circle::draw() method.');
    }
}
exports.default = Circle;
