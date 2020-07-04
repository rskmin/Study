"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var BusinessLookUp_1 = __importDefault(require("./BusinessLookUp"));
var BusinessDelegate = /** @class */ (function () {
    function BusinessDelegate() {
        this._lookupService = new BusinessLookUp_1.default();
    }
    Object.defineProperty(BusinessDelegate.prototype, "serviceType", {
        set: function (newType) {
            this._serviceType = newType;
        },
        enumerable: true,
        configurable: true
    });
    BusinessDelegate.prototype.doTask = function () {
        if (this._serviceType) {
            this._businessService = this._lookupService.getBusinessService(this._serviceType);
            this._businessService.doProcessing();
        }
        else {
            console.log('Please say your service type.');
        }
    };
    return BusinessDelegate;
}());
exports.default = BusinessDelegate;
