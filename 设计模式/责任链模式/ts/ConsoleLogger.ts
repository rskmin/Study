import AbstractLogger from "./AbstractLogger";

export default class ConsoleLogger extends AbstractLogger {
  constructor(level: number) {
    super()
    this.level = level
  }

  /**
   * @override
   */
  protected write(message: string): void {
    console.log(`Standard Console::Logger: ${message}`)
  }
}
