"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OrExpression = /** @class */ (function () {
    function OrExpression(expr1, expr2) {
        this.expr1 = expr1;
        this.expr2 = expr2;
    }
    /**
     * @override
     * @param {string} context
     */
    OrExpression.prototype.interpret = function (context) {
        return this.expr1.interpret(context) || this.expr2.interpret(context);
    };
    return OrExpression;
}());
exports.default = OrExpression;
