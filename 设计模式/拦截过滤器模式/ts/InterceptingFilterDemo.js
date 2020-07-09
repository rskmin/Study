"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var FilterManager_1 = __importDefault(require("./FilterManager"));
var Target_1 = __importDefault(require("./Target"));
var AuthenticaltionFilter_1 = __importDefault(require("./AuthenticaltionFilter"));
var DebugFilter_1 = __importDefault(require("./DebugFilter"));
var Client_1 = __importDefault(require("./Client"));
var filterManager = new FilterManager_1.default(new Target_1.default());
filterManager.setFilter(new AuthenticaltionFilter_1.default());
filterManager.setFilter(new DebugFilter_1.default());
var client = new Client_1.default();
client.setFilterManager(filterManager);
client.sendRequest('Home');
