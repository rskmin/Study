"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = __importDefault(require("./User"));
var robert = new User_1.default('Robert');
var john = new User_1.default('John');
robert.sendMessage('Hi! John!');
john.sendMessage('Hi! Robert!');
