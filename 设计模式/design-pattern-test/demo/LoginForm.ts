class LoginForm {
  public state: string = 'hide'
  private static instance: LoginForm
  private constructor() {}
  public static getInstance() {
    if (!this.instance) {
      this.instance = new LoginForm()
    }
    return this.instance
  }
  show() {
    if (this.state === 'show') {
      alert('已显示')
      return
    }
    this.state = 'show'
    console.log('登录框已显示')
  }
  hide() {
    if (this.state === 'hide') {
      alert('已隐藏')
      return 
    }
    this.state = 'hide'
    console.log('登录框已隐藏')
  }
}

const login1 = LoginForm.getInstance()
login1.show()
const login2 = LoginForm.getInstance()
login2.hide()

console.log(login1 === login2)
