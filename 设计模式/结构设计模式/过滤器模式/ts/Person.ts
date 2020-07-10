export default class Person {
  private name: string
  private gender: string
  private maritalStatus: string

  constructor(name: string, gender: string, maritalStatus: string) {
    this.name = name
    this.gender = gender
    this.maritalStatus = maritalStatus
  }

  getName(): string {
    return this.name
  }

  getGender(): string {
    return this.gender
  }

  getMaritalStatus(): string {
    return this.maritalStatus
  }
}