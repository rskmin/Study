"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Burger_1 = __importDefault(require("./Burger"));
// 扩展汉堡实体类 - 蔬菜汉堡
var VegBurger = /** @class */ (function (_super) {
    __extends(VegBurger, _super);
    function VegBurger() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VegBurger.prototype.price = function () {
        return 25.0;
    };
    VegBurger.prototype.name = function () {
        return 'Veg Burger';
    };
    return VegBurger;
}(Burger_1.default));
exports.default = VegBurger;
