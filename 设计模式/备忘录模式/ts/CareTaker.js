"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 备忘本
 */
var CareTaker = /** @class */ (function () {
    function CareTaker() {
        this.mementoList = [];
    }
    CareTaker.prototype.add = function (state) {
        this.mementoList.push(state);
    };
    CareTaker.prototype.get = function (index) {
        return this.mementoList[index];
    };
    return CareTaker;
}());
exports.default = CareTaker;
