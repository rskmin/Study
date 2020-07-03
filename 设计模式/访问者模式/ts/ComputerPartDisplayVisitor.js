"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Computer_1 = __importDefault(require("./Computer"));
var Mouse_1 = __importDefault(require("./Mouse"));
var Keyboard_1 = __importDefault(require("./Keyboard"));
var Monitor_1 = __importDefault(require("./Monitor"));
var ComputerPartDisplayVisitor = /** @class */ (function () {
    function ComputerPartDisplayVisitor() {
    }
    ComputerPartDisplayVisitor.prototype.visit = function (computerPart) {
        if (computerPart instanceof Computer_1.default) {
            console.log('Displaying Computer.');
        }
        else if (computerPart instanceof Mouse_1.default) {
            console.log('Displaying Mouse.');
        }
        else if (computerPart instanceof Keyboard_1.default) {
            console.log('Displaying Keyboard.');
        }
        else if (computerPart instanceof Monitor_1.default) {
            console.log('Displaying Monitor.');
        }
    };
    return ComputerPartDisplayVisitor;
}());
exports.default = ComputerPartDisplayVisitor;
