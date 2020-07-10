"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TerminalExpression = /** @class */ (function () {
    function TerminalExpression(data) {
        this.data = data;
    }
    /**
     * @override
     * @param {string} context
     */
    TerminalExpression.prototype.interpret = function (context) {
        if (context.indexOf(this.data) >= 0) {
            return true;
        }
        return false;
    };
    return TerminalExpression;
}());
exports.default = TerminalExpression;
