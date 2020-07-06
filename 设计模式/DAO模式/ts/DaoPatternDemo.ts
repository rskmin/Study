import StudentDaoImpl from "./StudentDaoImpl";
import StudentDao from './StudentDao'
import Student from "./Student";

const studentDao: StudentDao = new StudentDaoImpl()

// 输出所有学生
for (const student of studentDao.getAllStudents()) {
  console.log(`Student: [RollNo : ${student.rollNo}, Name : ${student.name}]`)
}

// 更新学生
const student: Student = studentDao.getAllStudents()[0]
student.name = 'Michael'
studentDao.updateStudent(student)

// 获取学生
const student1 = studentDao.getStudent(0)
console.log(`Student: [RollNo : ${student1.rollNo}, Name : ${student.name}]`)