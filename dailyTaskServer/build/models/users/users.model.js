"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyUsersCollection = exports.deleteUser = exports.createUser = exports.updateUser = exports.getAllUsers = exports.getUser = void 0;
const graphql_1 = require("graphql");
const users_mongo_1 = __importDefault(require("./users.mongo"));
async function getUser(username, password) {
    console.log(username, password);
    const foundUser = await users_mongo_1.default.findOne({
        username: username,
    });
    console.log(JSON.stringify(foundUser));
    //decrypt User's password using bcrypt
    if (!foundUser) {
        throw new graphql_1.GraphQLError(`Wrong username!`, {
            extensions: { code: 'BAD_USER_INPUT' },
        });
    }
    if (foundUser && foundUser.password === password) {
        return foundUser;
    }
    else {
        throw new graphql_1.GraphQLError(`Wrong password!`, {
            extensions: { code: 'BAD_USER_INPUT' },
        });
    }
}
exports.getUser = getUser;
async function getAllUsers() {
    const usersList = await users_mongo_1.default.find({}, {
        _id: 0,
        __v: 0,
    });
    return usersList;
}
exports.getAllUsers = getAllUsers;
async function updateUser(user) {
    try {
        await users_mongo_1.default.updateOne({
            id: user.id,
        }, user, {
            upsert: true,
        });
        const insertedUser = await getUser(user.username, user.password);
        if (insertedUser) {
            console.log(`user ${user.username} inserted!`);
            return insertedUser;
        }
        else {
            throw new graphql_1.GraphQLError(`Cannot update User!`, {
                extensions: { code: 'UPDATE ERROR!' },
            });
        }
    }
    catch (err) {
        console.log(`User could not be saved: ${err}`);
    }
}
exports.updateUser = updateUser;
async function createUser(user) {
    const newUser = {
        id: users_mongo_1.default.length,
        username: user.username,
        password: user.password,
    };
    return await updateUser(newUser);
}
exports.createUser = createUser;
async function deleteUser(user) { }
exports.deleteUser = deleteUser;
async function emptyUsersCollection() {
    await users_mongo_1.default.deleteMany({});
}
exports.emptyUsersCollection = emptyUsersCollection;
