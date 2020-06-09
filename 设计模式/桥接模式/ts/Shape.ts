import DrawAPI from "./DrawAPI";

export default abstract class Shape {
  protected constructor(protected drawAPI: DrawAPI) {
    this.drawAPI = drawAPI
  }
  abstract draw(): void
}