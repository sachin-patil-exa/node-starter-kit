import express from 'express';
import cors from 'cors';

import { PortConfiguration, HostConfiguration } from '../config';
import starterKitRoute from './api/starterkit-routes';

export const app = express();

const PORT = PortConfiguration.getAppPort();
const HOST = HostConfiguration.getAppHost();

app.use(express.json());
app.use(cors());
export const startServer = (): void => {
  app.listen(PORT, HOST, () => {
    console.log(`Server is Up and Running on http://${HOST}:${PORT},`);
  });
};

app.use('/starterkit', starterKitRoute);
