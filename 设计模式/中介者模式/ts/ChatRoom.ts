import User from './User'

export default class ChatRoom {
  static showMessage(user: User, message: string): void {
    console.log(`${new Date().toString()} [${user.getName()}] ${message}`)
  }
}