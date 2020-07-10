"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mouse = /** @class */ (function () {
    function Mouse() {
    }
    Mouse.prototype.accept = function (computerPartVisitor) {
        computerPartVisitor.visit(this);
    };
    return Mouse;
}());
exports.default = Mouse;
