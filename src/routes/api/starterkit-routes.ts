import { Application, Request, Response } from 'express';

import { starterKitHandler } from '../../handlers';

const express = require('express');

const starterKitRoute: Application = express.Router({ mergeParams: true });

starterKitRoute.post('/', async (request: Request, response: Response) => {
  starterKitHandler.createStarterKit(request, response);
});
starterKitRoute.get('/:id', async (request: Request, response: Response) => {
  starterKitHandler.getStarterKit(request, response);
});
starterKitRoute.put('/:id', async (request: Request, response: Response) => {
  starterKitHandler.updateStarterKit(request, response);
});
starterKitRoute.delete('/:id', async (request: Request, response: Response) => {
  starterKitHandler.deleteStarterKit(request, response);
});

export default starterKitRoute;
