import { ErrorMessages, HttpStatusCode } from '../constants';
import { StarterKit } from '../models';
import { AppCustomError, StarterkitInterface } from '../utils';
import { errorDecorator } from '../utils';

class StarterKitService {
  @errorDecorator.handleTryCatchError
  public async createStarterKit(starterKitPayload: StarterkitInterface) {
    const queredData = await StarterKit.getStarterKitByName(starterKitPayload.name);
    if (queredData === null) {
      const maxStarterKitId = await StarterKit.getMaximumStarterKitId();
      starterKitPayload.id = maxStarterKitId + 1;
      const starterKit = await StarterKit.createStarterKit(starterKitPayload);
      return starterKit;
    } else {
      throw new AppCustomError(HttpStatusCode.BAD_REQUEST, ErrorMessages.STARTERKIT_ERROR_CONSTANTS.nameAlreadyExists);
    }
  }
  @errorDecorator.handleTryCatchError
  public async getStarterKit(starterKitId: string) {
    const starterKit = await StarterKit.getStarterKitByObjectId(starterKitId);
    return starterKit;
  }
  @errorDecorator.handleTryCatchError
  public async updateStarterKit(starterKitId: string, starterKitPayload: StarterkitInterface) {
    const starterKit = await StarterKit.updateStarterKit(starterKitId, starterKitPayload);
    return starterKit;
  }
  @errorDecorator.handleTryCatchError
  public async deleteStarterKit(starterKitId: string) {
    const starterKit = await StarterKit.deleteStarterKit(starterKitId);
    return starterKit;
  }
}

const starterKitService = new StarterKitService();

export default starterKitService;
