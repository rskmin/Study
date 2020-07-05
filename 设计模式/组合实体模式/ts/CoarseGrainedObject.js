"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DependentObject1_1 = __importDefault(require("./DependentObject1"));
var DependentObject2_1 = __importDefault(require("./DependentObject2"));
// 粗粒度对象
var CoarseGrainedObject = /** @class */ (function () {
    function CoarseGrainedObject() {
        this.do1 = new DependentObject1_1.default();
        this.do2 = new DependentObject2_1.default();
    }
    CoarseGrainedObject.prototype.setData = function (data1, data2) {
        this.do1.data = data1;
        this.do2.data = data2;
    };
    CoarseGrainedObject.prototype.getData = function () {
        return [this.do1.data, this.do2.data];
    };
    return CoarseGrainedObject;
}());
exports.default = CoarseGrainedObject;
