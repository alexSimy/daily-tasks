const express = require('express');
import { IRouter } from 'express';
import { ApolloServer } from 'apollo-server-express';

import { buildSchema } from 'type-graphql';
import { UsersResolver } from '../models/users/users.resolver';

async function createGraphQLRouter() {
  const api = express.Router();
  // TODO try to move graphql to express.Router()

  // setting up apollo server
  const schema = await buildSchema({
    resolvers: [UsersResolver],
  });

  const apollo = new ApolloServer({
    schema: schema,
    introspection: true,
  });

  await apollo.start();
  apollo.applyMiddleware({ app: api, path: '/graphql' });

  return api;
}

export default createGraphQLRouter;
