import { ObjectId } from 'mongodb';

export interface StarterkitInterface {
  _id?: ObjectId;
  id?: number;
  name: string;
  description: string;
}
