"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JMSService = /** @class */ (function () {
    function JMSService() {
    }
    JMSService.prototype.doProcessing = function () {
        console.log('Processing task by invoking JMS Service');
    };
    return JMSService;
}());
exports.default = JMSService;
