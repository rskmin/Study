"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var SingleObject_1 = __importDefault(require("./SingleObject"));
// 构造函数是私有的，无法访问
// const object = new SingleObject()
var object = SingleObject_1.default.getInstance();
object.showMessage();
var object1 = SingleObject_1.default.getInstance();
console.log(object === object1);
