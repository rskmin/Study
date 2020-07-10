"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Broker = /** @class */ (function () {
    function Broker() {
        this.orderList = [];
    }
    Broker.prototype.takeOrder = function (order) {
        this.orderList.push(order);
    };
    Broker.prototype.placeOrders = function () {
        for (var _i = 0, _a = this.orderList; _i < _a.length; _i++) {
            var order = _a[_i];
            order.execute();
        }
        this.orderList.length = 0;
    };
    return Broker;
}());
exports.default = Broker;
