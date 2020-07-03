"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Computer_1 = __importDefault(require("./Computer"));
var ComputerPartDisplayVisitor_1 = __importDefault(require("./ComputerPartDisplayVisitor"));
var computer = new Computer_1.default();
computer.accept(new ComputerPartDisplayVisitor_1.default());
