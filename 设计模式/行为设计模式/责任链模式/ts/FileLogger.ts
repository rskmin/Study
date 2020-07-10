import AbstractLogger from "./AbstractLogger";

export default class FileLogger extends AbstractLogger {
  constructor(level: number) {
    super()
    this.level = level
  }

  /**
   * @override
   */
  protected write(message: string): void {
    console.log(`File::Logger: ${message}`)
  }
}