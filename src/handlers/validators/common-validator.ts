import { HttpStatusCode, ErrorMessages } from '../../constants';
import { AppCustomError } from '../../utils';

class CommonValidator {
  public objectIdValidator = (id: string) => {
    if (/^[0-9a-fA-F]{24}$/.test(id)) {
      return true;
    }
    throw new AppCustomError(HttpStatusCode.BAD_REQUEST, ErrorMessages.COMMON_ERROR_CONSTANTS.invalidObjectId);
  };
}

const commonValidator = new CommonValidator();

export default commonValidator;
