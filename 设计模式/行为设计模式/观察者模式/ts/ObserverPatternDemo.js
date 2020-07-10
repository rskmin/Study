"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Subject_1 = __importDefault(require("./Subject"));
var HexaObserver_1 = __importDefault(require("./HexaObserver"));
var OctalObserver_1 = __importDefault(require("./OctalObserver"));
var BinaryObserver_1 = __importDefault(require("./BinaryObserver"));
var subject = new Subject_1.default();
new HexaObserver_1.default(subject);
new OctalObserver_1.default(subject);
new BinaryObserver_1.default(subject);
console.log('First state change: 15');
subject.setState(15);
console.log('Second state change: 10');
subject.setState(10);
