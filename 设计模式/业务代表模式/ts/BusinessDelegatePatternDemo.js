"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var BusinessDelegate_1 = __importDefault(require("./BusinessDelegate"));
var Client_1 = __importDefault(require("./Client"));
var businessDelegate = new BusinessDelegate_1.default();
businessDelegate.serviceType = 'EJB';
var client = new Client_1.default(businessDelegate);
client.doTask();
businessDelegate.serviceType = 'JMS';
client.doTask();
