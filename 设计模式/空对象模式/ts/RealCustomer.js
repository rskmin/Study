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
var AbstractCustomer_1 = __importDefault(require("./AbstractCustomer"));
var RealCustomer = /** @class */ (function (_super) {
    __extends(RealCustomer, _super);
    function RealCustomer(name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        return _this;
    }
    RealCustomer.prototype.getName = function () {
        return this.name;
    };
    RealCustomer.prototype.isNil = function () {
        return false;
    };
    return RealCustomer;
}(AbstractCustomer_1.default));
exports.default = RealCustomer;
