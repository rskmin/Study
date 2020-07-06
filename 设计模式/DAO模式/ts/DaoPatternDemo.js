"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var StudentDaoImpl_1 = __importDefault(require("./StudentDaoImpl"));
var studentDao = new StudentDaoImpl_1.default();
// 输出所有学生
for (var _i = 0, _a = studentDao.getAllStudents(); _i < _a.length; _i++) {
    var student_1 = _a[_i];
    console.log("Student: [RollNo : " + student_1.rollNo + ", Name : " + student_1.name + "]");
}
// 更新学生
var student = studentDao.getAllStudents()[0];
student.name = 'Michael';
studentDao.updateStudent(student);
// 获取学生
var student1 = studentDao.getStudent(0);
console.log("Student: [RollNo : " + student1.rollNo + ", Name : " + student.name + "]");
