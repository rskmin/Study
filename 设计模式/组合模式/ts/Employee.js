"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 树状结构统一成员类型
 */
var Employee = /** @class */ (function () {
    function Employee(name, dept, salary) {
        this.subordinates = [];
        this.name = name;
        this.dept = dept;
        this.salary = salary;
    }
    Employee.prototype.add = function (e) {
        this.subordinates.push(e);
        return this;
    };
    Employee.prototype.remove = function (e) {
        var index = this.subordinates.indexOf(e);
        index >= 0 && this.subordinates.splice(index, 1);
        return this;
    };
    Employee.prototype.getSubordinates = function () {
        return this.subordinates;
    };
    Employee.prototype.toString = function () {
        return ("Employee : [ name : " + this.name + ", dept : " + this.dept + ", salary : " + this.salary + " ]");
    };
    return Employee;
}());
exports.default = Employee;
