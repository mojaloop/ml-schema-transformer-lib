import { loggerFactory } from '@mojaloop/central-services-logger/src/contextLogger';
import { LogContext, LogLevel, logLevelsMap } from '../types';

export const createLogger = (context: LogContext, logLevel: LogLevel) => {
    const log = loggerFactory(context);
    log.setLevel(logLevel);
    return log;
};

export const logger = createLogger('MLST', process.env.LOG_LEVEL as LogLevel || logLevelsMap.info);