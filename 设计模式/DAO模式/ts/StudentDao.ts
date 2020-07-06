import Student from './Student'

export default interface StudentDao {
  getAllStudents(): Array<Student>
  getStudent(rollNo: number): Student
  updateStudent(student: Student): void
  deleteStudent(student: Student): void
}