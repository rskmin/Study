"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractLogger_1 = __importDefault(require("./AbstractLogger"));
var ErrorLogger_1 = __importDefault(require("./ErrorLogger"));
var FileLogger_1 = __importDefault(require("./FileLogger"));
var ConsoleLogger_1 = __importDefault(require("./ConsoleLogger"));
function getChainOfLoggers() {
    var errorLogger = new ErrorLogger_1.default(AbstractLogger_1.default.ERROR);
    var fileLogger = new FileLogger_1.default(AbstractLogger_1.default.DEBUG);
    var consoleLogger = new ConsoleLogger_1.default(AbstractLogger_1.default.INFO);
    errorLogger.setNextLogger(fileLogger);
    fileLogger.setNextLogger(consoleLogger);
    return errorLogger;
}
var loggerChain = getChainOfLoggers();
loggerChain.logMessage(AbstractLogger_1.default.INFO, 'This is an information.');
loggerChain.logMessage(AbstractLogger_1.default.DEBUG, 'This is a debug level information.');
loggerChain.logMessage(AbstractLogger_1.default.ERROR, 'This is an error information.');
