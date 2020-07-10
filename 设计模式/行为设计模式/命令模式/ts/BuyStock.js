"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BuyStock = /** @class */ (function () {
    function BuyStock(abcStock) {
        this.abcStock = abcStock;
    }
    BuyStock.prototype.execute = function () {
        this.abcStock.buy();
    };
    return BuyStock;
}());
exports.default = BuyStock;
