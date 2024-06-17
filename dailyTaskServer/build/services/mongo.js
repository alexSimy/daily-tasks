"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoDisconnect = exports.mongoConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
// it'll only get triggered once due to "once" instead of "on"
mongoose_1.default.connection.once('open', () => {
    console.log('MongoDB connection ready!');
});
mongoose_1.default.connection.on('error', (err) => {
    console.log(`Mongo Error: ${err}`);
});
async function mongoConnect(test = false) {
    try {
        if (process.env.MONGO_URL_TEST && process.env.MONGO_URL) {
            await mongoose_1.default.connect(test ? process.env.MONGO_URL_TEST : process.env.MONGO_URL);
        }
    }
    catch (err) {
        throw new Error(`mongoConnect: ${err}`);
    }
}
exports.mongoConnect = mongoConnect;
async function mongoDisconnect() {
    try {
        await mongoose_1.default.disconnect();
    }
    catch (err) {
        throw new Error(`mongoDisconnect: ${err}`);
    }
}
exports.mongoDisconnect = mongoDisconnect;
