"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const users_resolver_1 = require("../models/users/users.resolver");
async function createGraphQLRouter() {
    const api = express.Router();
    // TODO try to move graphql to express.Router()
    // setting up apollo server
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [users_resolver_1.UsersResolver],
    });
    const apollo = new apollo_server_express_1.ApolloServer({
        schema: schema,
        introspection: true,
    });
    await apollo.start();
    apollo.applyMiddleware({ app: api, path: '/graphql' });
    return api;
}
exports.default = createGraphQLRouter;
