"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var FactoryProducer_1 = __importDefault(require("./FactoryProducer"));
// 获取形状工厂
var shapeFactory = FactoryProducer_1.default.getFactory('SHAPE');
// 获取形状为 Circle 的对象
var shape1 = shapeFactory === null || shapeFactory === void 0 ? void 0 : shapeFactory.getShape('CIRCLE');
// 调用 Circle 的 draw 方法
shape1 === null || shape1 === void 0 ? void 0 : shape1.draw();
// 获取形状为 Rectangle 的对象
var shape2 = shapeFactory === null || shapeFactory === void 0 ? void 0 : shapeFactory.getShape('RECTANGLE');
// 调用 Rectangle 的 draw 方法
shape2 === null || shape2 === void 0 ? void 0 : shape2.draw();
// 获取形状为 Square 的对象
var shape3 = shapeFactory === null || shapeFactory === void 0 ? void 0 : shapeFactory.getShape('SQUARE');
// 调用 Square 的 draw 方法
shape3 === null || shape3 === void 0 ? void 0 : shape3.draw();
// 获取颜色工厂
var colorFactory = FactoryProducer_1.default.getFactory('COLOR');
// 获取颜色为 Red 的对象
var color1 = colorFactory === null || colorFactory === void 0 ? void 0 : colorFactory.getColor('RED');
// 调用 Red 的 fill 方法
color1 === null || color1 === void 0 ? void 0 : color1.fill();
// 获取颜色为 Green 的对象
var color2 = colorFactory === null || colorFactory === void 0 ? void 0 : colorFactory.getColor('GREEN');
// 调用 Green 的 fill 方法
color2 === null || color2 === void 0 ? void 0 : color2.fill();
// 获取颜色为 Blue 的对象
var color3 = colorFactory === null || colorFactory === void 0 ? void 0 : colorFactory.getColor('Blue');
// 调用 Blue 的 fill 方法
color3 === null || color3 === void 0 ? void 0 : color3.fill();
