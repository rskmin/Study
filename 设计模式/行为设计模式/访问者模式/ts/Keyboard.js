"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Keyboard = /** @class */ (function () {
    function Keyboard() {
    }
    Keyboard.prototype.accept = function (computerPartVisitor) {
        computerPartVisitor.visit(this);
    };
    return Keyboard;
}());
exports.default = Keyboard;
