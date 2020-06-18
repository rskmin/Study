"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AndExpression = /** @class */ (function () {
    function AndExpression(expr1, expr2) {
        this.expr1 = expr1;
        this.expr2 = expr2;
    }
    /**
     * @override
     * @param {string} context
     */
    AndExpression.prototype.interpret = function (context) {
        return this.expr1.interpret(context) && this.expr2.interpret(context);
    };
    return AndExpression;
}());
exports.default = AndExpression;
