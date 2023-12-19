import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

// import { ACCESS_ACTION } from '../enums/access-action.type';
// import { HTTP_METHOD } from '../enums/http-method.type';
// import { APP_LOG } from '../enums/app-log.type';

export enum ACCESS_ACTION {
  IN = 'IN',
  OUT = 'OUT',
}

export enum HTTP_METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum APP_LOG {
  LOG = 'log',
  ERROR = 'error',
  DEBUG = 'debug',
  WARN = 'warn',
  INFO = 'info',
  VERBOSE = 'verbose',
}

@Injectable()
export class LoggerHelper {
  private readonly _appName: string;

  private readonly _env: string;

  private readonly _logger: winston.Logger;

  public constructor() {
    this._appName = process.env.PROJECT_CODE || '';

    this._env = process.env.ELASTIC_APM_SECRET_ENV || '';

    // const customFormat = winston.format.printf(
    //   ({ _timestamp, _app_name, _level, message }) => {
    //     return `${message}`;
    //   },
    // );

    // this._logger = winston.createLogger({
    //   level: 'info',
    //   format: winston.format.json(),
    //   transports: [
    //     new winston.transports.DailyRotateFile({
    //       datePattern: 'YYYYMMDDHH',
    //       filename: `${__dirname}/../../../app/logs/${this._appName}-${this._env}-%DATE%.log`,
    //       zippedArchive: true,
    //       maxSize: '100m',
    //       maxFiles: '7d',
    //       format: customFormat,
    //     }),
    //   ],
    // });
  }

  public accessLog(log: AccessLog) {
    const accessLog = {
      level: 'access',
      timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss.ssss'),
      app_name: this._appName,
      ...log,
    };
    const message = JSON.stringify(accessLog);
    this._logger.log({ level: 'info', message: message });
  }

  public sqlLog(log: SqlLog) {
    const sqlLog = {
      level: 'sql',
      timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss.ssss'),
      app_name: this._appName,
      ...log,
    };
    const message = JSON.stringify(sqlLog);
    this._logger.log({ level: 'info', message: message });
  }

  public appLog(level: APP_LOG, log: AppLog) {
    const appLog = {
      level: level,
      timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss.ssss'),
      app_name: this._appName,
      ...log,
    };
    const message = JSON.stringify(appLog);
    this._logger.log({ level: 'info', message: message });
  }

  public errorLog(log: ErrorLog) {
    const errorLog = {
      level: 'error',
      timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss.ssss'),
      app_name: this._appName,
      ...log,
    };
    const message = JSON.stringify(errorLog);
    this._logger.log({ level: 'info', message: message });
  }
}

export class AccessLog {
  apm_transaction_id!: string | null;

  uid!: string;

  action!: ACCESS_ACTION;

  method!: HTTP_METHOD;

  url!: string;

  data!: string;

  ip!: string;

  duration!: number;
}

export class AppLog {
  tag!: string | null;

  msg!: string;
}

export class ErrorLog {
  tag!: string | null;

  msg!: string;
}

export class SqlLog {
  tag!: string | null;

  msg!: string;
}
