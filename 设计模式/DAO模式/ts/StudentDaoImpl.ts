import StudentDao from './StudentDao'
import Student from './Student'

export default class StudentDaoImpl implements StudentDao {
  students: Array<Student>

  constructor() {
    this.students = new Array<Student>()
    const student1 = new Student('Robert', 0)
    const student2 = new Student('Jhon', 1)
    this.students.push(student1)
    this.students.push(student2)
  }

  deleteStudent(student: Student): void {
    const ifHas = this.students.indexOf(student)
    ifHas < 0 ? console.log('No such Student') : this.students.splice(ifHas, 1) && console.log(`Student: Roll No ${student.rollNo}, deleted from database`)
  }

  getAllStudents(): Array<Student> {
    return this.students
  }

  getStudent(rollNo: number): Student {
    return this.students.find(item => item.rollNo === rollNo)
  }

  updateStudent(student: Student): void {
    this.getStudent(student.rollNo).name = student.name
    console.log(`Student: Roll No ${student.rollNo}, updated in the database`)
  }
}