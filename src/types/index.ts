export type Json = string | number | boolean | Json[] | { [key: string]: Json };
export interface GenericObject {
  [key: string]: unknown;
}

export type JsonString = string;

export type OverrideMapping = JsonString | undefined;

export type LogContext = Json | string | null;

export const logLevelsMap = {
  error: 'error',
  warn: 'warn',
  info: 'info',
  verbose: 'verbose',
  debug: 'debug',
  silly: 'silly',
  audit: 'audit',
  trace: 'trace',
  perf: 'perf',
} as const;

export const logLevelValues = Object.values(logLevelsMap);

export type LogLevel = (typeof logLevelValues)[number];
