// 备忘类
class Memento {
  constructor(public content: string | null) {
    this.content = content
  }
  getContent() {
    return this.content
  }
}

// 备忘列表
class CareTaker {
  list: Array<Memento>
  constructor() {
    this.list = []
  }
  add(memento: Memento) {
    this.list.push(memento)
  }
  get(index: number) {
    return this.list[index]
  }
}

// 编辑器
class Editor {
  content: string | null
  constructor() {
    this.content = null
  }
  setContent(content: string) {
    this.content = content
  }
  getContent() {
    return this.content
  }
  saveContentToMemento() {
    return new Memento(this.content)
  }
  getConetntFromMemento(memento: Memento) {
    this.content = memento.getContent()
  }
}
