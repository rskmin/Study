"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ShapeFactory_1 = __importDefault(require("./ShapeFactory"));
var shapeFactory = new ShapeFactory_1.default();
var shape1 = shapeFactory.getShape('CIRCLE');
shape1 === null || shape1 === void 0 ? void 0 : shape1.draw();
var shape2 = shapeFactory.getShape('RECTANGLE');
shape2 === null || shape2 === void 0 ? void 0 : shape2.draw();
var shape3 = shapeFactory.getShape('SQUARE');
shape3 === null || shape3 === void 0 ? void 0 : shape3.draw();
