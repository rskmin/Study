export default abstract class AbstractLogger {
  static INFO: number = 1
  static DEBUG: number = 2
  static ERROR: number = 3

  protected level: number = 0

  protected nextLogger?: AbstractLogger

  setNextLogger(nextLogger: AbstractLogger): void {
    this.nextLogger = nextLogger
  }

  logMessage(level: number, message: string): void {
    if (this.level <= level) {
      this.write(message)
    }
    if (this.nextLogger != null) {
      this.nextLogger.logMessage(level, message)
    }
  }
  protected abstract write(message: string): void
}