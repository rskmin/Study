"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CoarseGrainedObject_1 = __importDefault(require("./CoarseGrainedObject"));
// 创建组合实体
var CompositeEntity = /** @class */ (function () {
    function CompositeEntity() {
        this.cgo = new CoarseGrainedObject_1.default();
    }
    CompositeEntity.prototype.setData = function (data1, data2) {
        this.cgo.setData(data1, data2);
    };
    CompositeEntity.prototype.getData = function () {
        return this.cgo.getData();
    };
    return CompositeEntity;
}());
exports.default = CompositeEntity;
