import { starterKitHandler } from '..';
import { HttpStatusCode, ErrorMessages } from '../../constants';
import { COMMON_ERROR_CONSTANTS } from '../../constants/error-constants';
import { starterKitService } from '../../services';
import { request, response } from './mock';

const validStarterKitData = {
  name: 'valid name',
  description: 'valid desc',
};

const starterKitResponse = {
  _id: '650bce8773b598ab749f0c44',
  id: 1,
  name: 'valid name',
  description: 'valid desc',
};
const invalidStarterKitPayload = {
  description: 'test desc',
};
const emptyPayload = {};
describe('unit test cases for starterKitHandler', () => {
  let mockRequest: any;
  let mockResponse: any;
  ///Ensuring that after each test case, value for request and response is reset again to inital value
  beforeEach(() => {
    mockRequest = request;
    mockResponse = response;
    jest.clearAllMocks();
  });
  it('test createStarterKit with valid data', async () => {
    mockRequest.body = validStarterKitData;
    starterKitService.createStarterKit = jest.fn().mockResolvedValue(starterKitResponse);
    await starterKitHandler.createStarterKit(mockRequest, mockResponse);
    expect(mockResponse.responseStatus).toBe(HttpStatusCode.OK);
    expect(mockResponse.body.name).toBe(starterKitResponse.name);
    expect(starterKitService.createStarterKit).toBeCalledTimes(1);
  });
  it('test getStarterKit with valid objectId as request path params', async () => {
    mockRequest.params.id = '650bce8773b598ab749f0c44';
    starterKitService.getStarterKit = jest.fn().mockResolvedValue(starterKitResponse);
    await starterKitHandler.getStarterKit(mockRequest, mockResponse);
    expect(mockResponse.responseStatus).toBe(HttpStatusCode.OK);
    expect(mockResponse.body).toBe(starterKitResponse);
    expect(starterKitService.getStarterKit).toBeCalledTimes(1);
  });

  it('test getStarterKit handler when response is null from database', async () => {
    mockRequest.params.id = '650bce8773b598ab749f0c45';
    starterKitService.getStarterKit = jest.fn().mockResolvedValue(null);
    await starterKitHandler.getStarterKit(mockRequest, mockResponse);
    expect(mockResponse.body).toBe(null);
    expect(starterKitService.getStarterKit).toBeCalledTimes(1);
  });
  it('test getStarterKit when objectId lesser than length 24', async () => {
    mockRequest.params.id = '650bce8773b598ab749f0c4';
    let errorMessage = COMMON_ERROR_CONSTANTS.invalidObjectId;
    starterKitService.getStarterKit = jest.fn().mockResolvedValue(errorMessage);
    await starterKitHandler.getStarterKit(mockRequest, mockResponse);
    expect(mockResponse.body.message).toBe(errorMessage);
    expect(starterKitService.getStarterKit).not.toBeCalled();
  });
  it('test getStarterKitHandler with valid objectId as request path params and runtime error thrown by called function', async () => {
    mockRequest.params.id = '650bce8773b598ab749f0c44';
    starterKitService.getStarterKit = jest.fn().mockRejectedValue(new Error('Record doesnot exist'));
    await starterKitHandler.getStarterKit(mockRequest, mockResponse);
    expect(mockResponse.responseStatus).toBe(HttpStatusCode.INTERNAL_SERVER_ERROR);
    expect(mockResponse.body.message).toBe('Record doesnot exist');
    expect(starterKitService.getStarterKit).toBeCalledTimes(1);
  });

  it('test createStarterKit with invalid data and to test the validator', async () => {
    mockRequest.body = invalidStarterKitPayload;
    const starterKitServicespy = jest.spyOn(starterKitService, 'createStarterKit');
    await starterKitHandler.createStarterKit(mockRequest, mockResponse);
    expect(mockResponse.responseStatus).toBe(HttpStatusCode.BAD_REQUEST);
    expect(mockResponse.body.message).toBe(ErrorMessages.STARTERKIT_ERROR_CONSTANTS.nameIsRequired);
    expect(starterKitServicespy).not.toHaveBeenCalled();
  });
  it('test createStarterKit with emptyData and to test the validator', async () => {
    mockRequest.body = emptyPayload;
    const starterKitServicespy = jest.spyOn(starterKitService, 'createStarterKit');
    await starterKitHandler.createStarterKit(mockRequest, mockResponse);
    expect(mockResponse.responseStatus).toBe(HttpStatusCode.BAD_REQUEST);
    expect(mockResponse.body.message).toBe(ErrorMessages.COMMON_ERROR_CONSTANTS.emptyObject);
    expect(starterKitServicespy).not.toHaveBeenCalled();
  });

  it('test deleteStarterKitHandler with valid objectId as request path params', async () => {
    mockRequest.params.id = '650bce8773b598ab749f0c44';
    starterKitService.deleteStarterKit = jest.fn().mockResolvedValue(starterKitResponse);
    await starterKitHandler.deleteStarterKit(mockRequest, mockResponse);
    expect(mockResponse.responseStatus).toBe(HttpStatusCode.OK);
    expect(mockResponse.body.name).toBe(starterKitResponse.name);
    expect(starterKitService.deleteStarterKit).toBeCalledTimes(1);
  });
  it('test deleteStarterKitHandler with invalid objectId as request path params', async () => {
    mockRequest.params.id = '650bce8773b598ab749f0c4';
    const starterKitServiceSpy = jest.spyOn(starterKitService, 'deleteStarterKit');
    await starterKitHandler.deleteStarterKit(mockRequest, mockResponse);
    expect(mockResponse.responseStatus).toBe(HttpStatusCode.BAD_REQUEST);
    expect(mockResponse.body.message).toBe(ErrorMessages.COMMON_ERROR_CONSTANTS.invalidObjectId);
    expect(starterKitServiceSpy).not.toBeCalled();
  });

  it('test deleteStarterKitHandler with valid objectId as request path params and runtime error thrown by called function', async () => {
    mockRequest.params.id = '650bce8773b598ab749f0c44';
    starterKitService.deleteStarterKit = jest.fn().mockRejectedValue(new Error('Record doesnot exist'));
    await starterKitHandler.deleteStarterKit(mockRequest, mockResponse);
    expect(mockResponse.responseStatus).toBe(HttpStatusCode.INTERNAL_SERVER_ERROR);
    expect(mockResponse.body.message).toBe('Record doesnot exist');
    expect(starterKitService.deleteStarterKit).toBeCalledTimes(1);
  });
  it('test updateStarterKit with valid data', async () => {
    mockRequest.body = { name: 'valid name' };
    mockRequest.params = { id: '650bce8773b598ab749f0c44' };
    starterKitService.updateStarterKit = jest.fn().mockResolvedValue(starterKitResponse);
    await starterKitHandler.updateStarterKit(mockRequest, mockResponse);
    expect(mockResponse.responseStatus).toBe(HttpStatusCode.OK);
    expect(mockResponse.body.name).toBe(starterKitResponse.name);
    expect(starterKitService.updateStarterKit).toBeCalledTimes(1);
  });
  it('test updateStarterKit with Invalid data', async () => {
    mockRequest.body = {};
    mockRequest.params = { id: '650bce8773b598ab749f0c44' };
    const starterKitServiceSpy = jest.spyOn(starterKitService, 'updateStarterKit');
    const result = await starterKitHandler.updateStarterKit(mockRequest, mockResponse);
    expect(mockResponse.responseStatus).toBe(HttpStatusCode.BAD_REQUEST);
    expect(mockResponse.body.message).toBe(ErrorMessages.COMMON_ERROR_CONSTANTS.emptyObject);
    expect(starterKitServiceSpy).not.toHaveBeenCalled();
  });

  it('test updateStarterKit with valid data and runtime error thrown by called function', async () => {
    mockRequest.body = { name: 'valid name' };
    mockRequest.params = { id: '650bce8773b598ab749f0c44' };
    starterKitService.updateStarterKit = jest.fn().mockRejectedValue(new Error('Record doesnot exist'));
    await starterKitHandler.updateStarterKit(mockRequest, mockResponse);
    expect(mockResponse.responseStatus).toBe(HttpStatusCode.INTERNAL_SERVER_ERROR);
    expect(mockResponse.body.message).toBe('Record doesnot exist');
    expect(starterKitService.updateStarterKit).toBeCalledTimes(1);
  });
});
