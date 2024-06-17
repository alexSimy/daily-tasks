"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express = require('express');
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const mongo_1 = require("./services/mongo");
const api_1 = __importDefault(require("./routes/api"));
async function createExpressApp() {
    const app = express();
    // apply good to have middlewares
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)());
    app.use((0, morgan_1.default)('short'));
    app.use(express.json());
    // load data on startup
    await (0, mongo_1.mongoConnect)(false);
    // defining apis
    app.get('/readiness', (req, res) => {
        return res.send({ ready: true });
    });
    const api = await (0, api_1.default)();
    app.use('/api/v1/', api);
    return app;
}
module.exports = createExpressApp;
