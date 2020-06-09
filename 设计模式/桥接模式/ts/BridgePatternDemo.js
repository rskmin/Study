"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Circle_1 = __importDefault(require("./Circle"));
var RedCircle_1 = __importDefault(require("./RedCircle"));
var GreenCircle_1 = __importDefault(require("./GreenCircle"));
var redCircle = new Circle_1.default(100, 100, 10, new RedCircle_1.default());
var greenCircle = new Circle_1.default(100, 100, 10, new GreenCircle_1.default());
redCircle.draw();
greenCircle.draw();
