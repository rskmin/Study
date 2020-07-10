"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 套餐类
var Meal = /** @class */ (function () {
    function Meal() {
        this.items = [];
    }
    Meal.prototype.addItem = function (item) {
        this.items.push(item);
        return this;
    };
    Meal.prototype.getCost = function () {
        return this.items.reduce(function (acc, cur) { return acc + cur.price(); }, 0);
    };
    Meal.prototype.showItems = function () {
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var item = _a[_i];
            console.log("Item : " + item.name() + ", Packing : " + item.packing().pack() + ", Price : " + item.price());
        }
    };
    return Meal;
}());
exports.default = Meal;
