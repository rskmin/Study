"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Mouse_1 = __importDefault(require("./Mouse"));
var Keyboard_1 = __importDefault(require("./Keyboard"));
var Monitor_1 = __importDefault(require("./Monitor"));
var Computer = /** @class */ (function () {
    function Computer() {
        this.parts = [new Mouse_1.default(), new Keyboard_1.default(), new Monitor_1.default()];
    }
    Computer.prototype.accept = function (computerPartVisitor) {
        for (var i = 0, len = this.parts.length; i < len; i++) {
            this.parts[i].accept(computerPartVisitor);
        }
        computerPartVisitor.visit(this);
    };
    return Computer;
}());
exports.default = Computer;
