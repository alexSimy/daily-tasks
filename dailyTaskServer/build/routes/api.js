"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
async function createAPIRouter() {
    const api = express_1.default.Router();
    // TODO try to move graphql to express.Router()
    return api;
}
exports.default = createAPIRouter;
