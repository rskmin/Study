"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Shape_1 = __importDefault(require("./Shape"));
class Square extends Shape_1.default {
    constructor() {
        super();
        this.type = 'Square';
    }
    draw() {
        console.log('Inside Square::draw() method.');
    }
}
exports.default = Square;
