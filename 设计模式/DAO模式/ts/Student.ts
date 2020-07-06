export default class Student {
  private _name: string
  private _rollNo: number

  constructor(name: string, rollNo: number) {
    this._name = name
    this._rollNo = rollNo
  }

  
  public get name() : string {
    return this._name
  }
  
  public set name(v : string) {
    this._name = v
  }

  
  public get rollNo() : number {
    return this._rollNo
  }

  
  public set rollNo(v : number) {
    this._rollNo = v
  }
  
}