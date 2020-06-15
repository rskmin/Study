"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ProxyImage_1 = __importDefault(require("./ProxyImage"));
var image = new ProxyImage_1.default('test_10mb.jpg');
image.display();
console.log();
image.display();
