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
var ColdDrink_1 = __importDefault(require("./ColdDrink"));
// 扩展冷饮实体类 - 百事可乐
var Pepsi = /** @class */ (function (_super) {
    __extends(Pepsi, _super);
    function Pepsi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Pepsi.prototype.price = function () {
        return 35.0;
    };
    Pepsi.prototype.name = function () {
        return 'Pepsi';
    };
    return Pepsi;
}(ColdDrink_1.default));
exports.default = Pepsi;
