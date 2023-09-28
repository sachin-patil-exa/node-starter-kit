import starterKitService from '../starterkit-service';
import { StarterKit } from '../../models';
import { AppCustomError } from '../../utils';
import { ErrorMessages } from '../../constants';

const validStarterKitData = {
  name: 'valid name',
  description: 'valid desc',
};

const invalidStarterKitData = {
  name: 'valid desc',
};

const starterKitResponse = {
  _id: '650bce8773b598ab749f0c44',
  id: 1,
  name: 'valid name',
  description: 'valid desc',
};

describe('unit test case for starterKitService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('test starterKitService with valid data and data is not present in db', async () => {
    StarterKit.getMaximumStarterKitId = jest.fn().mockResolvedValue(1);
    StarterKit.createStarterKit = jest.fn().mockResolvedValue(starterKitResponse);
    StarterKit.getStarterKitByName = jest.fn().mockResolvedValue(null);
    const result = await starterKitService.createStarterKit(validStarterKitData);
    expect(result.name).toBe(starterKitResponse.name);
    expect(StarterKit.getMaximumStarterKitId).toBeCalledTimes(1);
    expect(StarterKit.createStarterKit).toBeCalledTimes(1);
  });

  it('test starterKitService with valid data and data is present in db already', async () => {
    let createStarterKitSpy;
    try {
      StarterKit.getStarterKitByName = jest.fn().mockResolvedValue(starterKitResponse);
      StarterKit.getMaximumStarterKitId = jest.fn().mockResolvedValue(1);
      createStarterKitSpy = jest.spyOn(StarterKit, 'createStarterKit');
      await starterKitService.createStarterKit(invalidStarterKitData as any);
    } catch (error) {
      const errorStack = error as AppCustomError;
      expect(errorStack.message).toBe(ErrorMessages.STARTERKIT_ERROR_CONSTANTS.nameAlreadyExists);
      expect(createStarterKitSpy).toBeCalledTimes(0);
    }
  });

  it('test getStarterKitService with valid id', async () => {
    const id: string = '650bce8773b598ab749f0c44';
    StarterKit.getStarterKitByObjectId = jest.fn().mockResolvedValue(starterKitResponse);
    const result = await starterKitService.getStarterKit(id);
    expect(result.name).toBe(starterKitResponse.name);
    expect(StarterKit.getStarterKitByObjectId).toBeCalledTimes(1);
  });

  it('test getStarterKitService when response is null from database', async () => {
    const id: string = '650bce8773b598ab749f0c45';
    StarterKit.getStarterKitByObjectId = jest.fn().mockResolvedValue(null);
    const result = await starterKitService.getStarterKit(id);
    expect(result).toBe(null);
    expect(StarterKit.getStarterKitByObjectId).toBeCalledTimes(1);
  });
  it('test getStarterKitService when runtime error thrown by called function', async () => {
    const id = '650bce8773b598ab749f0c44';
    StarterKit.getStarterKitByObjectId = jest.fn().mockRejectedValue(new Error('Record not found'));
    try {
      const result = await starterKitService.getStarterKit(id);
    } catch (error) {
      const errorStack = error as AppCustomError;
      expect(errorStack.message).toBe('Record not found');
      expect(StarterKit.getStarterKitByObjectId).toBeCalledTimes(1);
    }
  });

  it('test deleteStarterKitService with valid data', async () => {
    StarterKit.deleteStarterKit = jest.fn().mockResolvedValue(starterKitResponse);
    const result = await starterKitService.deleteStarterKit('650bce8773b598ab749f0c44');
    expect(result.name).toBe(starterKitResponse.name);
    expect(StarterKit.deleteStarterKit).toBeCalledTimes(1);
  });

  it('test deleteStarterKitService when runtime error thrown by called function', async () => {
    StarterKit.deleteStarterKit = jest.fn().mockRejectedValue(new Error('Record not found'));
    try {
      const result = await starterKitService.deleteStarterKit('650bce8773b598ab749f0c44');
    } catch (error) {
      const errorStack = error as AppCustomError;
      expect(errorStack.message).toBe('Record not found');
      expect(StarterKit.deleteStarterKit).toBeCalledTimes(1);
    }
  });

  it('test updateStarterKit with valid data', async () => {
    const starterKitId = '650bce8773b598ab749f0c44';
    StarterKit.updateStarterKit = jest.fn().mockResolvedValue(starterKitResponse);
    const result = await starterKitService.updateStarterKit(starterKitId, {
      name: 'valid name',
    } as any);
    expect(result.name).toBe(starterKitResponse.name);
    expect(StarterKit.updateStarterKit).toBeCalledTimes(1);
  });
  it('test updateStarterKit with invalid data', async () => {
    try {
      const starterKitId = '650bce8773b598ab749f0c44';
      StarterKit.updateStarterKit = jest.fn().mockRejectedValue(new Error('Record cannot be updated'));
      const result = await starterKitService.updateStarterKit(starterKitId, {} as any);
    } catch (error) {
      const errorStack = error as AppCustomError;
      expect(errorStack.message).toBe('Record cannot be updated');
      expect(StarterKit.updateStarterKit).toBeCalledTimes(1);
    }
  });
});
