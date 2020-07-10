import Student from './Student'
import StudentController from './StudentController'
import StudentView from './StudentView'

let model: Student = new Student({name: 'Li', rollNo: '111'})
// let model: Student = new Student({name: 'Li', rollNo: '111'})

const view: StudentView = new StudentView()

const controller: StudentController = new StudentController(model, view)

controller.updateView()

// 跟新数据模型
// controller.setStudentName('John')
controller.updateView()