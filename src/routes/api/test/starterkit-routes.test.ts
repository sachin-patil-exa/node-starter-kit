import { app } from '../..';
import request from 'supertest';

import { starterKitHandler } from '../../../handlers';
import { starterKitService } from '../../../services';
import { ErrorMessages, HttpStatusCode } from '../../../constants';

const starterKitPayload = {
  _id: '650bce8773b598ab749f0c44',
  id: 1,
  name: ' test',
  description: 'test desc',
};

const invalidStarterKitPayload = {
  description: 'test desc',
};

describe('unit test cases for starterkit routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('test createStarterKit route by passing vaild request body', async () => {
    const starterKitHandlerSpy = jest.spyOn(starterKitHandler, 'createStarterKit');
    starterKitService.createStarterKit = jest.fn().mockResolvedValue(starterKitPayload);
    const result = await request(app.app).post('/starterkit').send({ name: 'test', description: 'test desc' });
    expect(result.status).toBe(HttpStatusCode.OK);
    expect(starterKitService.createStarterKit).toBeCalledTimes(1);
    expect(starterKitHandlerSpy).toHaveBeenCalled();
  });
  it('test createStarterKit route by passing Invalid request body', async () => {
    const starterKitHandlerSpy = jest.spyOn(starterKitHandler, 'createStarterKit');
    const starterKitServicespy = jest.spyOn(starterKitService, 'createStarterKit');
    const result = await request(app.app).post('/starterkit').send(invalidStarterKitPayload);
    expect(result.status).toBe(HttpStatusCode.BAD_REQUEST);
    expect(result.body.message).toBe(ErrorMessages.STARTERKIT_ERROR_CONSTANTS.nameIsRequired);
    expect(starterKitHandlerSpy).toHaveBeenCalled();
    expect(starterKitServicespy).not.toHaveBeenCalled();
  });
  it('test createStarterKit route by passing invalid route in path parameter', async () => {
    const starterKitHandlerSpy = jest.spyOn(starterKitHandler, 'createStarterKit');
    const result = await request(app.app).post('/starterkit/1').send(invalidStarterKitPayload);
    expect(result.status).toBe(HttpStatusCode.NOT_FOUND);
    expect(starterKitHandlerSpy).not.toHaveBeenCalled();
  });
  it('test getStarterKit route by passing vaild request path params', async () => {
    const id = '650bce8773b598ab749f0c44';
    const starterKitHandlerSpy = jest.spyOn(starterKitHandler, 'getStarterKit');
    starterKitService.getStarterKit = jest.fn().mockResolvedValue(id);
    const result = await request(app.app).get(`/starterkit/${id}`);
    expect(result.status).toBe(HttpStatusCode.OK);
    expect(starterKitService.getStarterKit).toBeCalledTimes(1);
    expect(starterKitHandlerSpy).toHaveBeenCalled();
  });
  it('test getStarterKit route when response is null from database', async () => {
    const id = '650bce8773b598ab749f0c45';
    const starterKitHandlerSpy = jest.spyOn(starterKitHandler, 'getStarterKit');
    starterKitService.getStarterKit = jest.fn().mockResolvedValue(null);
    const result = await request(app.app).get(`/starterkit/${id}`);
    expect(result.status).toBe(HttpStatusCode.OK);
    expect(starterKitService.getStarterKit).toBeCalledTimes(1);
    expect(starterKitHandlerSpy).toHaveBeenCalled();
  });
  it('test getStarterKit route by passing id lesser than length 24', async () => {
    const id = '650bce8773b598ab749f0c';
    const errorMessage = ErrorMessages.COMMON_ERROR_CONSTANTS.invalidObjectId;
    const starterKitHandlerSpy = jest.spyOn(starterKitHandler, 'getStarterKit');
    const starterKitServiceSpy = jest.spyOn(starterKitService, 'getStarterKit');
    const result = await request(app.app).get(`/starterkit/${id}`);
    expect(result.status).toBe(HttpStatusCode.BAD_REQUEST);
    expect(starterKitServiceSpy).not.toBeCalled();
    expect(starterKitHandlerSpy).toBeCalledTimes(1);
    expect(result.body.message).toBe(errorMessage);
  });

  it('fail test to getStarterKit route when invalid route is called', async () => {
    const starterKitHandlerSpy = jest.spyOn(starterKitHandler, 'getStarterKit');
    const result = await request(app.app).get(`/starterkit/get/1`);
    expect(result.status).toBe(HttpStatusCode.NOT_FOUND);
    expect(starterKitHandlerSpy).not.toHaveBeenCalled();
  });
  it('test deleteStarterKit route by passing invalid ObjectId in request path params', async () => {
    const starterKitHandlerSpy = jest.spyOn(starterKitHandler, 'deleteStarterKit');
    const starterKitServiceSpy = jest.spyOn(starterKitService, 'deleteStarterKit');
    const result = await request(app.app).delete('/starterkit/650bce8773b598ab74f0c');
    expect(result.status).toBe(HttpStatusCode.BAD_REQUEST);
    expect(result.body.message).toBe(ErrorMessages.COMMON_ERROR_CONSTANTS.invalidObjectId);
    expect(starterKitServiceSpy).toBeCalledTimes(0);
    expect(starterKitHandlerSpy).toHaveBeenCalled();
  });

  it('test deleteStarterKit route by passing vaild request path params', async () => {
    const starterKitHandlerSpy = jest.spyOn(starterKitHandler, 'deleteStarterKit');
    starterKitService.deleteStarterKit = jest.fn().mockResolvedValue(starterKitPayload);
    const result = await request(app.app).delete('/starterkit/650bce8773b598ab749f0c44');
    expect(result.status).toBe(HttpStatusCode.OK);
    expect(starterKitService.deleteStarterKit).toBeCalledTimes(1);
    expect(starterKitHandlerSpy).toHaveBeenCalled();
  });
  it('test deleteStarterKit route by passing invalid ObjectId in request path params', async () => {
    const starterKitHandlerSpy = jest.spyOn(starterKitHandler, 'deleteStarterKit');
    const starterKitServiceSpy = jest.spyOn(starterKitService, 'deleteStarterKit');
    const result = await request(app.app).delete('/starterkit/650bce8773b598ab74f0c');
    expect(result.status).toBe(HttpStatusCode.BAD_REQUEST);
    expect(result.body.message).toBe(ErrorMessages.COMMON_ERROR_CONSTANTS.invalidObjectId);
    expect(starterKitServiceSpy).toBeCalledTimes(0);
    expect(starterKitHandlerSpy).toHaveBeenCalled();
  });

  it('test deleteStarterKit route by passing vaild request path params and runtime error thrown by called function', async () => {
    const starterKitHandlerSpy = jest.spyOn(starterKitHandler, 'deleteStarterKit');
    starterKitService.deleteStarterKit = jest.fn().mockRejectedValue(new Error('Record doesnot exist'));
    const result = await request(app.app).delete('/starterkit/650bce8773b598ab749f0c44');
    expect(result.status).toBe(HttpStatusCode.INTERNAL_SERVER_ERROR);
    expect(result.body.message).toBe('Record doesnot exist');
    expect(starterKitService.deleteStarterKit).toBeCalledTimes(1);
    expect(starterKitHandlerSpy).toHaveBeenCalled();
  });
  it('fail test to deleteStarterKit route when invalid route is called', async () => {
    const starterKitHandlerSpy = jest.spyOn(starterKitHandler, 'deleteStarterKit');
    const result = await request(app.app).delete('/starterkit/delete/1');
    expect(result.status).toBe(HttpStatusCode.NOT_FOUND);
    expect(starterKitHandlerSpy).not.toHaveBeenCalled();
  });
  it('test updateStarterKit route by passing valid request body', async () => {
    const objectId = '650bce8773b598ab749f0c44';
    const starterKitHandlerSpy = jest.spyOn(starterKitHandler, 'updateStarterKit');
    starterKitService.updateStarterKit = jest.fn().mockResolvedValue(starterKitPayload);
    const result = await request(app.app).put(`/starterkit/${objectId}`).send({ name: 'test' });
    expect(result.status).toBe(HttpStatusCode.OK);
    expect(starterKitService.updateStarterKit).toBeCalledTimes(1);
    expect(starterKitHandlerSpy).toHaveBeenCalled();
  });
  it('test updateStarterKit route by passing invaild request body', async () => {
    const objectId = '650bce8773b598ab749f0c44';
    const starterKitHandlerSpy = jest.spyOn(starterKitHandler, 'updateStarterKit');
    const starterKitServiceSpy = jest.spyOn(starterKitService, 'updateStarterKit');
    const result = await request(app.app).put(`/starterkit/${objectId}`).send({});
    expect(result.status).toBe(HttpStatusCode.BAD_REQUEST);
    expect(result.body.message).toBe(ErrorMessages.COMMON_ERROR_CONSTANTS.emptyObject);
    expect(starterKitHandlerSpy).toHaveBeenCalled();
    expect(starterKitServiceSpy).not.toHaveBeenCalled();
  });
  it('test updateStarterKit route by passing invalid route', async () => {
    const starterKitHandlerSpy = jest.spyOn(starterKitHandler, 'updateStarterKit');
    const result = await request(app.app).put(`/starterkit/put/123`).send({ name: 'test' });
    expect(result.status).toBe(HttpStatusCode.NOT_FOUND);
    expect(starterKitHandlerSpy).not.toHaveBeenCalled();
  });
});
