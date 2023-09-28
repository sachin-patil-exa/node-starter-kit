import { Model } from 'mongoose';

import { StarterkitInterface } from '../../../utils';
import mongoConfiguration from '../db';

const mongoConnection = mongoConfiguration.getDatabaseInstance();
const schemaTypes = mongoConnection.Schema.Types;
const STARTER_KIT_MODEL = 'StarterKit';

const StarterKitSchema = new mongoConnection.Schema(
  {
    id: { type: schemaTypes.Number },
    name: { type: schemaTypes.String, required: true },
    description: { type: schemaTypes.String },
  },
  { collection: 'starterkits' },
);

interface StarterKitModel extends Model<StarterkitInterface> {
  createStarterKit(starterKit: StarterkitInterface): Promise<StarterkitInterface>;
  getStarterKitByObjectId(starterKitId: string): Promise<StarterkitInterface>;
  getStarterKitByName(starterKitName: string): Promise<StarterkitInterface>;
  getMaximumStarterKitId(): Promise<number>;
  updateStarterKit(starterKitId: string, starterKit: StarterkitInterface): Promise<StarterkitInterface>;
  deleteStarterKit(starterKitId: string): Promise<StarterkitInterface>;
}

StarterKitSchema.statics.createStarterKit = async (starterKit: StarterkitInterface): Promise<StarterkitInterface> => {
  try {
    const starterkitDatabaseOutput = await mongoConnection.model(STARTER_KIT_MODEL).create(starterKit);
    return starterkitDatabaseOutput;
  } catch (error) {
    throw error;
  }
};

StarterKitSchema.statics.getStarterKitByObjectId = async (starterKitId: string): Promise<StarterkitInterface> => {
  try {
    const starterkitOutput = await mongoConnection.model(STARTER_KIT_MODEL).findById(starterKitId);
    return starterkitOutput;
  } catch (error) {
    throw error;
  }
};

StarterKitSchema.statics.getStarterKitByName = async (starterKitName: string): Promise<StarterkitInterface> => {
  try {
    const starterkitOutput = await mongoConnection.model(STARTER_KIT_MODEL).findOne({ name: { $regex: new RegExp(starterKitName, 'i') } });
    return starterkitOutput;
  } catch (error) {
    throw error;
  }
};

StarterKitSchema.statics.getMaximumStarterKitId = async (): Promise<number> => {
  try {
    const starterKit = await mongoConnection.model(STARTER_KIT_MODEL).find({}).sort({ id: -1 }).limit(1);
    let maxId: number = 0;
    if (starterKit.length > 0) {
      maxId = starterKit[0].id;
    }
    return maxId;
  } catch (error) {
    throw error;
  }
};

StarterKitSchema.statics.updateStarterKit = async (starterKitId: string, starterKit: StarterkitInterface): Promise<StarterkitInterface> => {
  try {
    const starterKitDatabaseOutput = await mongoConnection
      .model(STARTER_KIT_MODEL)
      .findByIdAndUpdate(starterKitId, starterKit, { new: true });
    return starterKitDatabaseOutput;
  } catch (error) {
    throw error;
  }
};

StarterKitSchema.statics.deleteStarterKit = async (starterKitId: string): Promise<StarterkitInterface> => {
  try {
    const starterKitDatabaseOutput = await mongoConnection.model(STARTER_KIT_MODEL).findByIdAndDelete(starterKitId);
    return starterKitDatabaseOutput;
  } catch (error) {
    throw error;
  }
};

export default mongoConnection.model<StarterkitInterface, StarterKitModel>(STARTER_KIT_MODEL, StarterKitSchema);
