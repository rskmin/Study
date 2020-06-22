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
 * 实体二进制观察者
 */
var BinaryObserver = /** @class */ (function (_super) {
    __extends(BinaryObserver, _super);
    function BinaryObserver(subject) {
        var _this = _super.call(this, subject) || this;
        // 向观察者管理类中加入自己
        _this.subject.attach(_this);
        return _this;
    }
    BinaryObserver.prototype.update = function () {
        var _a;
        console.log("Binary String: " + ((_a = this.subject.getState()) === null || _a === void 0 ? void 0 : _a.toString(2)));
    };
    return BinaryObserver;
}(Observer_1.default));
exports.default = BinaryObserver;
