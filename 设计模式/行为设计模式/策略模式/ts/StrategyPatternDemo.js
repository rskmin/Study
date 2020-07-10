"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Context_1 = __importDefault(require("./Context"));
var OperationAdd_1 = __importDefault(require("./OperationAdd"));
var context = new Context_1.default(new OperationAdd_1.default());
console.log("10 + 5 = " + context.executeStrategy(10, 5));
context = new Context_1.default(new OperationAdd_1.default());
console.log("10 - 5 = " + context.executeStrategy(10, 5));
context = new Context_1.default(new OperationAdd_1.default());
console.log("10 * 5 = " + context.executeStrategy(10, 5));
