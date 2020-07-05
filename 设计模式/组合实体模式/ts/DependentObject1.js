"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DependentObject1 = /** @class */ (function () {
    function DependentObject1() {
        this._data = '';
    }
    Object.defineProperty(DependentObject1.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (newData) {
            this._data = newData;
        },
        enumerable: true,
        configurable: true
    });
    return DependentObject1;
}());
exports.default = DependentObject1;
