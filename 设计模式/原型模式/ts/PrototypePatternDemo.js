"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ShapeCache_1 = __importDefault(require("./ShapeCache"));
ShapeCache_1.default.loadCache();
const cloneShape = ShapeCache_1.default.getShape('1');
console.log(`Shape : ${cloneShape.getType()}`);
const cloneShape2 = ShapeCache_1.default.getShape('2');
console.log(`Shape : ${cloneShape2.getType()}`);
const cloneShape3 = ShapeCache_1.default.getShape('3');
console.log(`Shape : ${cloneShape3.getType()}`);
