"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var RealCustomer_1 = __importDefault(require("./RealCustomer"));
var NullCustomer_1 = __importDefault(require("./NullCustomer"));
var CustomerFactory = /** @class */ (function () {
    function CustomerFactory() {
    }
    CustomerFactory.getCustomer = function (name) {
        var caseNames = this.names.map(function (item) { return item.toLocaleUpperCase(); });
        for (var i = 0, len = this.names.length; i < len; i++) {
            if (caseNames[i] === name.toLocaleUpperCase()) {
                return new RealCustomer_1.default(name);
            }
        }
        return new NullCustomer_1.default();
    };
    CustomerFactory.names = ['Rob', 'Joe', 'Julie'];
    return CustomerFactory;
}());
exports.default = CustomerFactory;
