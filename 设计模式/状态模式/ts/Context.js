"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Context = /** @class */ (function () {
    function Context() {
        this.state = null;
    }
    Context.prototype.setState = function (state) {
        this.state = state;
    };
    Context.prototype.getState = function () {
        return this.state;
    };
    return Context;
}());
exports.default = Context;
