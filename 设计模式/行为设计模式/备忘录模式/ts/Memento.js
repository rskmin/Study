"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 备忘页
 */
var Memento = /** @class */ (function () {
    function Memento(state) {
        this.state = state;
    }
    Memento.prototype.getState = function () {
        return this.state;
    };
    return Memento;
}());
exports.default = Memento;
