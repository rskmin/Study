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
var AbstractLogger_1 = __importDefault(require("./AbstractLogger"));
var FileLogger = /** @class */ (function (_super) {
    __extends(FileLogger, _super);
    function FileLogger(level) {
        var _this = _super.call(this) || this;
        _this.level = level;
        return _this;
    }
    /**
     * @override
     */
    FileLogger.prototype.write = function (message) {
        console.log("File::Logger: " + message);
    };
    return FileLogger;
}(AbstractLogger_1.default));
exports.default = FileLogger;
