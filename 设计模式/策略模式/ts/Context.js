"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Context = /** @class */ (function () {
    function Context(strategy) {
        this.strategy = strategy;
    }
    Context.prototype.executeStrategy = function (num1, num2) {
        return this.strategy.doOperation(num1, num2);
    };
    return Context;
}());
exports.default = Context;
