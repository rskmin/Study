"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Client = /** @class */ (function () {
    function Client(businessService) {
        this.businessService = businessService;
    }
    Client.prototype.doTask = function () {
        this.businessService.doTask();
    };
    return Client;
}());
exports.default = Client;
