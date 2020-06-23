"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var Context_1 = __importDefault(require("./Context"));
var StartState_1 = __importDefault(require("./StartState"));
var StopState_1 = __importDefault(require("./StopState"));
var context = new Context_1.default();
var startState = new StartState_1.default();
startState.doAction(context);
console.log((_a = context.getState()) === null || _a === void 0 ? void 0 : _a.toString());
var stopState = new StopState_1.default();
stopState.doAction(context);
console.log((_b = context.getState()) === null || _b === void 0 ? void 0 : _b.toString());
