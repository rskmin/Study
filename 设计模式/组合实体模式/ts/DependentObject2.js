"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DependentObject2 = /** @class */ (function () {
    function DependentObject2() {
        this._data = '';
    }
    Object.defineProperty(DependentObject2.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (newData) {
            this._data = newData;
        },
        enumerable: true,
        configurable: true
    });
    return DependentObject2;
}());
exports.default = DependentObject2;
