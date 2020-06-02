class SingleObject {
  private static instance: SingleObject
  private constructor() {}
  public static getInstance(): SingleObject {
    if (this.instance == null) {
      this.instance = new SingleObject()
    }
    return this.instance
  }
  public login() {
    console.log("login...")
  }
}

const p1: SingleObject = SingleObject.getInstance()
const p2: SingleObject = SingleObject.getInstance()

console.log(p1 === p2)
