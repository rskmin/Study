"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SellStock = /** @class */ (function () {
    function SellStock(abcStock) {
        this.abcStock = abcStock;
    }
    SellStock.prototype.execute = function () {
        this.abcStock.sell();
    };
    return SellStock;
}());
exports.default = SellStock;
