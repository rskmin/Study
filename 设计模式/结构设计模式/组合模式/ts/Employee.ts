/**
 * 树状结构统一成员类型
 */
export default class Employee {
  private name: string
  private dept: string // 部门
  private salary: number
  private subordinates: Array<Employee> = []

  constructor(name: string, dept: string, salary: number) {
    this.name = name
    this.dept = dept
    this.salary = salary
  }

  add(e: Employee): Employee {
    this.subordinates.push(e)
    return this
  }

  remove(e: Employee): Employee {
    const index = this.subordinates.indexOf(e)
    index >= 0 && this.subordinates.splice(index, 1)
    return this
  }

  getSubordinates(): Array<Employee> {
    return this.subordinates
  }

  toString(): string {
    return (`Employee : [ name : ${this.name}, dept : ${this.dept}, salary : ${this.salary} ]`)
  }

}