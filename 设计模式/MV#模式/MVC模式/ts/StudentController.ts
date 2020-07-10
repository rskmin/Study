import StudentView from './StudentView'
import Student from './Student'

export default class StudentController {
  private _model: Student
  private _view: StudentView

  constructor(model: Student, view: StudentView) {
    this._model = model
    this._view = view
  }
  
  setStudentName(name: string): void {
    this._model.name = name
  }
  getStudentName(): string | undefined {
    return this._model.name
  }

  setStudentRollNo(rollNo: string): void {
    this._model.rollNo = rollNo
  }
  getStudentRollNo(): string | undefined {
    return this._model.rollNo
  }

  updateView(): void {
    this._view.printStudentDetails(this._model.name, this._model.rollNo)
  }
  
}