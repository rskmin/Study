"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EJBService = /** @class */ (function () {
    function EJBService() {
    }
    EJBService.prototype.doProcessing = function () {
        console.log('Processing task by invoking EJB Service');
    };
    return EJBService;
}());
exports.default = EJBService;
