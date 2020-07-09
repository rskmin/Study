"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var FilterChain_1 = __importDefault(require("./FilterChain"));
/**
 * 过滤管理器
 */
var FilterManager = /** @class */ (function () {
    function FilterManager(target) {
        this.filterChain = new FilterChain_1.default();
        this.filterChain.setTarget(target);
    }
    FilterManager.prototype.setFilter = function (filter) {
        this.filterChain.addFilter(filter);
    };
    FilterManager.prototype.filterRequest = function (request) {
        this.filterChain.execute(request);
    };
    return FilterManager;
}());
exports.default = FilterManager;
