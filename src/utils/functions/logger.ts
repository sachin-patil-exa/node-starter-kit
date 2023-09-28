import winston from 'winston';

import { LoggingConstants } from '../../constants';

const loggingFormat = winston.format.printf(({ level, message, timestamp, additionalInfo }) => {
  let logMessage = additionalInfo
    ? `${level}: ${message}, timestamp:${timestamp} ,additionalInfo:${additionalInfo}`
    : `${level}: ${message}, timestamp:${timestamp}`;

  return logMessage;
});

const logger = winston.createLogger({
  level: LoggingConstants.LOGGING_LEVELS.info, //use error as logging level while deploying code
  format: winston.format.combine(
    winston.format.colorize(LoggingConstants.LOGGING_COLOR_CONFIGURATION_CONSTANTS),

    winston.format.timestamp(),
    loggingFormat,
    //     winston.format.simple(),

    //   Below format doesnot work for colorize... so comment out winston.format.colorize
    //  winston.format.prettyPrint({colorize:true}),
    //   winston.format.json(),
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
