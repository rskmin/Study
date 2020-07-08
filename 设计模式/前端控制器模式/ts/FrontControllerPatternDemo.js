"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var FrontController_1 = __importDefault(require("./FrontController"));
var frontController = new FrontController_1.default();
frontController.dispatchRequest('HOME');
frontController.dispatchRequest('STUDENT');
