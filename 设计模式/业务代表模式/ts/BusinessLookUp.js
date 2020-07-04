"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var EJBService_1 = __importDefault(require("./EJBService"));
var JMSService_1 = __importDefault(require("./JMSService"));
var BusinessLookUp = /** @class */ (function () {
    function BusinessLookUp() {
    }
    BusinessLookUp.prototype.getBusinessService = function (serviceType) {
        if (serviceType === 'EJB') {
            return new EJBService_1.default();
        }
        else {
            return new JMSService_1.default();
        }
    };
    return BusinessLookUp;
}());
exports.default = BusinessLookUp;
