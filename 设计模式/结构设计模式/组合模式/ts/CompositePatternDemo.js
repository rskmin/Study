"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Employee_1 = __importDefault(require("./Employee"));
var CEO = new Employee_1.default('John', 'CEO', 30000);
var headSales = new Employee_1.default('Robert', 'Head Sales', 20000);
var headMarketing = new Employee_1.default('Michel', 'Head Marketing', 20000);
var clerk1 = new Employee_1.default('Laura', 'Marketing', 10000);
var clerk2 = new Employee_1.default('Bob', 'Marketing', 10000);
var salesExecutive1 = new Employee_1.default('Richard', 'Sales', 10000);
var salesExecutive2 = new Employee_1.default('Rob', 'Sales', 10000);
CEO.add(headSales).add(headMarketing);
headSales.add(salesExecutive1).add(salesExecutive2);
headMarketing.add(clerk1).add(clerk2);
function printEmployee(employee) {
    console.log(employee.toString());
    if (employee.getSubordinates().length === 0)
        return;
    for (var _i = 0, _a = employee.getSubordinates(); _i < _a.length; _i++) {
        var sub = _a[_i];
        console.log(sub.toString());
        printEmployee(sub);
    }
}
printEmployee(CEO);
