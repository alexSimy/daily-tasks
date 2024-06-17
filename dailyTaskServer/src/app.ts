import 'reflect-metadata';
const express = require('express');
import { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { mongoConnect } from './services/mongo';
import createGraphQLRouter from './routes/api';

async function createExpressApp() {
  const app = express();

  // apply good to have middlewares
  app.use(helmet());
  app.use(cors());
  app.use(morgan('short'));
  app.use(express.json());

  // load data on startup
  await mongoConnect(false);

  // defining apis
  app.get('/readiness', (req: Request, res: Response) => {
    return res.send({ ready: true });
  });

  const api = await createGraphQLRouter();
  app.use('/api/v1/', api);

  return app;
}
module.exports = createExpressApp;
