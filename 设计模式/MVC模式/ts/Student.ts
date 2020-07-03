export default class Student {
  private _rollNo: string
  private _name: string

  constructor(object: {name: string, rollNo: string}) {
    let {name, rollNo} = object
    this._name = name
    this._rollNo = rollNo
  }

  public get rollNo(): string {
    return this._rollNo || ''
  }

  public set rollNo(newRollNo: string) {
    this._name = newRollNo
  }

  public get name(): string {
    return this._name || ''
  }
  
  public set name(newName : string) {
    this._name = newName;
  }
}
