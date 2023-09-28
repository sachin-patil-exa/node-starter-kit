import { HttpStatusCode } from '../../constants';
import { AppCustomError } from '../classes';
import { logger } from '../functions';

class ErrorDecorator {
  public handleTryCatchError(target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        const result = await originalMethod.apply(this, args);
        logger.info(`In ${key}`, {
          additionalInfo: JSON.stringify(result),
        });
        return result;
      } catch (error) {
        const errorStack: AppCustomError = error as AppCustomError;
        logger.error(`In ${key}, errorMessage:${errorStack.message}, errorCode:${errorStack.statusCode}`);
        throw error; // You can choose to rethrow the error or handle it as needed
      }
    };
  }

  public handleResponseError(target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const response = args[1];
      try {
        await originalMethod.apply(this, args);
        return;
      } catch (error) {
        const errorStack: AppCustomError = error as AppCustomError;
        const status = errorStack.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;
        logger.error(`In ${key}, errorMessage:${errorStack.message}, errorCode:${status}`);
        response.status(status).json({ message: errorStack.message });
      }
    };
  }
}

const errorDecorator = new ErrorDecorator();
export default errorDecorator;
