import ChatRoom from "./ChatRoom"

export default class User {
  private name: string
  constructor(name: string) {
    this.name = name
  }
  getName(): string {
    return this.name
  }
  setName(name: string): void {
    this.name = name
  }
  sendMessage(message: string): void {
    ChatRoom.showMessage(this, message)
  }
}