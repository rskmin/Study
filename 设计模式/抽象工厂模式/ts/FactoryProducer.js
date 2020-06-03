"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ShapeFactory_1 = __importDefault(require("./ShapeFactory"));
var ColorFactory_1 = __importDefault(require("./ColorFactory"));
var FactoryProducer = /** @class */ (function () {
    function FactoryProducer() {
    }
    FactoryProducer.getFactory = function (choice) {
        choice = choice.toLocaleUpperCase();
        if (choice === 'SHAPE') {
            return new ShapeFactory_1.default();
        }
        else if (choice === 'COLOR') {
            return new ColorFactory_1.default();
        }
        return null;
    };
    return FactoryProducer;
}());
exports.default = FactoryProducer;
