"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Monitor = /** @class */ (function () {
    function Monitor() {
    }
    Monitor.prototype.accept = function (computerPartVisitor) {
        computerPartVisitor.visit(this);
    };
    return Monitor;
}());
exports.default = Monitor;
