import 'reflect-metadata';
const express = require('express');
import { Request, Response } from 'express';
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

import { ApolloServer } from 'apollo-server-express';

import { buildSchema } from 'type-graphql';
import { UsersResolver } from './models/users/users.resolver';

const { mongoConnect } = require('./services/mongo');

async function createExpressApp() {
  const app = express();

  // apply good to have middlewares
  app.use(helmet());
  app.use(cors());
  app.use(morgan('short'));
  app.use(express.json());

  // load data on startup
  await mongoConnect(false);

  // setting up apollo server
  const schema = await buildSchema({
    resolvers: [UsersResolver],
  });

  const apollo = new ApolloServer({
    schema: schema,
    introspection: true,
  });

  await apollo.start();
  apollo.applyMiddleware({ app: app, path: '/graphql' });

  // defining apis
  app.get('/readiness', (req: Request, res: Response) => {
    return res.send({ ready: true });
  });

  return app;
}
module.exports = createExpressApp;
