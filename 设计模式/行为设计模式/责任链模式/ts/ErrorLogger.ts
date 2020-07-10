import AbstractLogger from "./AbstractLogger";

export default class ErrorLogger extends AbstractLogger {
  constructor(level: number) {
    super()
    this.level = level
  }

  /**
   * @override
   */
  protected write(message: string): void {
    console.log(`Error Console::Logger: ${message}`)
  }
}
