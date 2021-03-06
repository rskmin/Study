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
var Observer_1 = __importDefault(require("./Observer"));
/**
 * 十六进制实体观察者
 */
var HexaObserver = /** @class */ (function (_super) {
    __extends(HexaObserver, _super);
    function HexaObserver(subject) {
        var _this = _super.call(this, subject) || this;
        _this.subject.attach(_this);
        return _this;
    }
    HexaObserver.prototype.update = function () {
        var _a;
        console.log("Hex String: " + ((_a = this.subject.getState()) === null || _a === void 0 ? void 0 : _a.toString(16).toLocaleUpperCase()));
    };
    return HexaObserver;
}(Observer_1.default));
exports.default = HexaObserver;
