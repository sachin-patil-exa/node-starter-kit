import { Request, Response } from 'express';

import { HttpStatusCode } from '../constants';
import { starterKitService } from '../services';
import { StarterkitInterface } from '../utils';
import { errorDecorator } from '../utils';
import { commonValidator, starterKitValidator } from './validators';

class StarterKitHandler {
  @errorDecorator.handleResponseError
  public async createStarterKit(request: Request, response: Response) {
    const starterKitPayload: StarterkitInterface = request.body;
    starterKitValidator.validateStarterKitPayload(starterKitPayload);
    const starterKitResponse = await starterKitService.createStarterKit(starterKitPayload);
    response.status(HttpStatusCode.OK).json(starterKitResponse);
  }
  @errorDecorator.handleResponseError
  public async getStarterKit(request: Request, response: Response) {
    const starterKitId: string = request.params.id;
    commonValidator.objectIdValidator(starterKitId);
    const starterKitResponse = await starterKitService.getStarterKit(starterKitId);
    response.status(HttpStatusCode.OK).json(starterKitResponse);
  }

  @errorDecorator.handleResponseError
  public async updateStarterKit(request: Request, response: Response) {
    const starterKitId: string = request.params.id;
    const starterKitPayload: StarterkitInterface = request.body;
    commonValidator.objectIdValidator(starterKitId);
    starterKitValidator.validateStarterKitUpdatePayload(starterKitPayload);
    const starterKitResponse = await starterKitService.updateStarterKit(starterKitId, starterKitPayload);
    response.status(HttpStatusCode.OK).json(starterKitResponse);
  }
  @errorDecorator.handleResponseError
  public async deleteStarterKit(request: Request, response: Response) {
    const starterKitId: string = request.params.id;
    commonValidator.objectIdValidator(starterKitId);
    const starterKitResponse = await starterKitService.deleteStarterKit(starterKitId);
    response.status(HttpStatusCode.OK).json(starterKitResponse);
  }
}

const starterKitHandler = new StarterKitHandler();

export default starterKitHandler;
