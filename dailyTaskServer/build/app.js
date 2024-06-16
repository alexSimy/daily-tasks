"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const users_resolver_1 = require("./models/users/users.resolver");
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
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [users_resolver_1.UsersResolver],
    });
    const apollo = new apollo_server_express_1.ApolloServer({
        schema: schema,
        introspection: true,
    });
    await apollo.start();
    apollo.applyMiddleware({ app: app, path: '/graphql' });
    // defining apis
    app.get('/readiness', (req, res) => {
        return res.send({ ready: true });
    });
    return app;
}
module.exports = createExpressApp;
