import AbstractLogger from './AbstractLogger'
import ErrorLogger from './ErrorLogger'
import FileLogger from './FileLogger'
import ConsoleLogger from './ConsoleLogger'

function getChainOfLoggers() {
  const errorLogger: AbstractLogger = new ErrorLogger(AbstractLogger.ERROR)
  const fileLogger: AbstractLogger = new FileLogger(AbstractLogger.DEBUG)
  const consoleLogger: AbstractLogger = new ConsoleLogger(AbstractLogger.INFO)

  errorLogger.setNextLogger(fileLogger)
  fileLogger.setNextLogger(consoleLogger)

  return errorLogger
}

const loggerChain = getChainOfLoggers()
loggerChain.logMessage(AbstractLogger.INFO, 'This is an information.')
loggerChain.logMessage(AbstractLogger.DEBUG, 'This is a debug level information.')
loggerChain.logMessage(AbstractLogger.ERROR, 'This is an error information.')
