import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { ERROR_CODE } from '../enums/error-code.type';
import { LoggerHelper } from '../helpers/logger.helper';

@Catch()
export class CatchExceptionFilter implements ExceptionFilter {
  public constructor(private readonly _logger: LoggerHelper) {}

  private _errorMappings: Record<string, number> = {
    BadRequestError: ERROR_CODE.BadRequestError,
    ForbiddenException: ERROR_CODE.Forbidden,
    ForbiddenError: ERROR_CODE.Forbidden,
    DataNotExistError: ERROR_CODE.DataNotExistError,
    DataAlreadyExistError: ERROR_CODE.DataNotExistError,
    DataConflict: ERROR_CODE.DataConflict,
    DeleteFailError: ERROR_CODE.DeleteFailError,
    MissingParamError: ERROR_CODE.MissingParamError,
    UpdateFailError: ERROR_CODE.UpdateFailError,
    UnauthorizedError: ERROR_CODE.Unauthorized,
    CreateUserFailError: ERROR_CODE.CreateUserFailError,
    CreateUserBatchFailError: ERROR_CODE.CreateUserBatchFailError,
    NameAlreadyExistError: ERROR_CODE.NameAlreadyExistError,
    ExceedStorageLimitError: ERROR_CODE.ExceedStorageLimitError,
    SubDomainAlreadyExistError: ERROR_CODE.SubDomainAlreadyExistError,
    PermissionDeniedError: ERROR_CODE.PermissionDeniedError,
    ExamNotExistError: ERROR_CODE.ExamNotExistError,
    ReviewNotExistError: ERROR_CODE.ReviewNotExistError,
    ReviewQuestionNotExistError: ERROR_CODE.ReviewQuestionNotExistError,
  };

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const err = exception as Error;

    const serializedError = {
      name: err.name,
      message: err.message,
      stack: err.stack,
    };

    const responseObject = {
      from: process.env.PROJECT_CODE || '',
      error: ERROR_CODE.InternalServerError,
      message: serializedError.message,
      data: serializedError,
      token: '',
    };

    if (exception instanceof BadRequestException) {
      const badRequestException = exception as BadRequestException;
      const badRequestModel =
        badRequestException.getResponse() as BadRequestModel;
      responseObject.error = ERROR_CODE.BadRequestError;
      responseObject.message = badRequestModel.message.toString();
    }

    const errorName = err.name;
    if (this._errorMappings[errorName]) {
      responseObject.error = this._errorMappings[errorName];
    }

    const callSite = this.findCallSite(responseObject.data.stack);
    this._logger.errorLog({
      tag: callSite,
      msg: JSON.stringify(responseObject),
    });

    response.status(200).json(responseObject);
  }

  private findCallSite(callStack: string | undefined): string | null {
    if (!callStack) {
      return null;
    }
    const match = callStack.match(/at\s+([^(]+)\s+\(/);
    if (match && match.length >= 2) {
      const extractedString = match[1].trim();
      return extractedString;
    }
    return null;
  }
}

type BadRequestModel = {
  message: string[];
  error: string;
  statusCode: number;
};
