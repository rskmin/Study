class A {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
}

const singletonify = (OriginalClass) => {
  let SingleObj = null
  class Single extends OriginalClass {
    constructor(...params) {
      if(!SingleObj) {
        super(...params)
        SingleObj = this
      } else {
        return SingleObj
      }
    }
  }
  return Single
}

const SingleA = singletonify(A)
const a1 = new SingleA()
const a2 = new SingleA()
const a3 = new SingleA()


console.log(a1 instanceof A);
console.log(a1 instanceof SingleA);