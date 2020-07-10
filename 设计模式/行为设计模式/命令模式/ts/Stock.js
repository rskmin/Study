"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Stock = /** @class */ (function () {
    function Stock() {
        this.name = 'ABC';
        this.quantity = 10;
    }
    Stock.prototype.buy = function () {
        console.log("Stock [ Name: " + this.name + ", Quantity: " + this.quantity + " ] bought");
    };
    Stock.prototype.sell = function () {
        console.log("Stock [ Name: " + this.name + ", Quantity: " + this.quantity + " ] sold");
    };
    return Stock;
}());
exports.default = Stock;
