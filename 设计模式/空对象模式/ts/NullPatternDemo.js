"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CustomerFactory_1 = __importDefault(require("./CustomerFactory"));
var customer1 = CustomerFactory_1.default.getCustomer('rob');
var customer2 = CustomerFactory_1.default.getCustomer('bob');
var customer3 = CustomerFactory_1.default.getCustomer('julie');
var customer4 = CustomerFactory_1.default.getCustomer('laura');
console.log('Customers');
console.log(customer1.getName());
console.log(customer2.getName());
console.log(customer3.getName());
console.log(customer4.getName());
