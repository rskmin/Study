"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Student_1 = __importDefault(require("./Student"));
var StudentDaoImpl = /** @class */ (function () {
    function StudentDaoImpl() {
        this.students = new Array();
        var student1 = new Student_1.default('Robert', 0);
        var student2 = new Student_1.default('Jhon', 1);
        this.students.push(student1);
        this.students.push(student2);
    }
    StudentDaoImpl.prototype.deleteStudent = function (student) {
        var ifHas = this.students.indexOf(student);
        ifHas < 0 ? console.log('No such Student') : this.students.splice(ifHas, 1) && console.log("Student: Roll No " + student.rollNo + ", deleted from database");
    };
    StudentDaoImpl.prototype.getAllStudents = function () {
        return this.students;
    };
    StudentDaoImpl.prototype.getStudent = function (rollNo) {
        return this.students.find(function (item) { return item.rollNo === rollNo; });
    };
    StudentDaoImpl.prototype.updateStudent = function (student) {
        this.getStudent(student.rollNo).name = student.name;
        console.log("Student: Roll No " + student.rollNo + ", updated in the database");
    };
    return StudentDaoImpl;
}());
exports.default = StudentDaoImpl;
