"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractLogger = /** @class */ (function () {
    function AbstractLogger() {
        this.level = 0;
    }
    AbstractLogger.prototype.setNextLogger = function (nextLogger) {
        this.nextLogger = nextLogger;
    };
    AbstractLogger.prototype.logMessage = function (level, message) {
        if (this.level <= level) {
            this.write(message);
        }
        if (this.nextLogger != null) {
            this.nextLogger.logMessage(level, message);
        }
    };
    AbstractLogger.INFO = 1;
    AbstractLogger.DEBUG = 2;
    AbstractLogger.ERROR = 3;
    return AbstractLogger;
}());
exports.default = AbstractLogger;
