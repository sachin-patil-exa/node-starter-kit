import { Request, Response, NextFunction } from 'express';

import { AppCustomError } from '../utils';
import { HttpStatusCode, ErrorMessages } from '../constants';
import { logger } from '../utils';

class ErrorMiddleware {
  public errorLogger = (error: AppCustomError, request: Request, response: Response, next: NextFunction) => {
    logger.error(`In errorLogger, errorMessage:${error.message}, errorCode:${error.statusCode}`);
    next(error);
  };

  public errorResponder = (error: AppCustomError, request: Request, response: Response, next: NextFunction): void => {
    const status = error.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;
    response.status(status).json({ message: error.message });
    return;
  };

  public routeNotFound = (request: Request, response: Response, next: NextFunction): void => {
    response.status(HttpStatusCode.NOT_FOUND).json({ message: ErrorMessages.HTTP_ERROR_CONSTANTS.routeNotFound });
    return;
  };
}

let errorMiddleware = new ErrorMiddleware();
export default errorMiddleware;
