import User from "./User";

const robert = new User('Robert')
const john = new User('John')

robert.sendMessage('Hi! John!')
john.sendMessage('Hi! Robert!')