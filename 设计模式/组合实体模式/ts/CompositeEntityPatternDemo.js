"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Client_1 = __importDefault(require("./Client"));
var client = new Client_1.default();
client.setData('Test', 'Data');
client.printData();
client.setData('Second Test', 'Data1');
client.printData();
