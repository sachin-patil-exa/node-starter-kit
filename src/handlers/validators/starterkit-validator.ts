import { ErrorMessages, HttpStatusCode } from '../../constants';
import { AppCustomError, StarterkitInterface } from '../../utils';

class StarterKitValidator {
  public validateStarterKitPayload = (payload: StarterkitInterface) => {
    let errorMessage = '';
    if (Object.keys(payload).length == 0) {
      throw new AppCustomError(HttpStatusCode.BAD_REQUEST, ErrorMessages.COMMON_ERROR_CONSTANTS.emptyObject);
    }
    if (!payload?.name || payload.name.trim() === '') {
      errorMessage = errorMessage + ErrorMessages.STARTERKIT_ERROR_CONSTANTS.nameIsRequired;
    }
    if (!payload?.description || payload.description.trim() === '') {
      errorMessage = errorMessage + ErrorMessages.STARTERKIT_ERROR_CONSTANTS.descriptionIsRequired;
    }
    if (errorMessage !== '') {
      throw new AppCustomError(HttpStatusCode.BAD_REQUEST, errorMessage);
    }
  };

  public validateStarterKitUpdatePayload = (payload: StarterkitInterface) => {
    let errorMessage = '';

    if (Object.keys(payload).length == 0) {
      throw new AppCustomError(HttpStatusCode.BAD_REQUEST, ErrorMessages.COMMON_ERROR_CONSTANTS.emptyObject);
    }
    if (payload.name === null || payload.name?.trim() === '') {
      errorMessage = errorMessage + ErrorMessages.STARTERKIT_ERROR_CONSTANTS.nameIsRequired;
    }
    if (payload.description === null || payload.description?.trim() === '') {
      errorMessage = errorMessage + ErrorMessages.STARTERKIT_ERROR_CONSTANTS.descriptionIsRequired;
    }
    if (errorMessage !== '') {
      throw new AppCustomError(HttpStatusCode.BAD_REQUEST, errorMessage);
    }
  };
}

const starterKitValidator = new StarterKitValidator();

export default starterKitValidator;
