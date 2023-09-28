import mongoose from 'mongoose';

export interface DbConnectInterface {
  connectToDatabase(): Promise<true | undefined>;
  getDatabaseInstance(): typeof mongoose;
  disconnectFromDatabase(): Promise<true | undefined>;
}

export interface DbConfigurationInterface {
  scheme: string;
  userName: string;
  password: string;
  name: string;
  host: string;
  port?: string;
}
