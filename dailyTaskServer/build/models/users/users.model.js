"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { GraphQLError } = require('graphql');
const users = require('./users.mongo');
async function getUser(username, password) {
    console.log(username, password);
    const foundUser = await users.findOne({
        username: username,
    });
    console.log(JSON.stringify(foundUser));
    //decrypt DBUser's password using bcrypt
    if (!foundUser) {
        throw new GraphQLError(`Wrong username!`, {
            extensions: { code: 'BAD_USER_INPUT' },
        });
    }
    if (foundUser && foundUser.password === password) {
        return foundUser;
    }
    else {
        throw new GraphQLError(`Wrong password!`, {
            extensions: { code: 'BAD_USER_INPUT' },
        });
    }
}
async function updateUser(user) {
    try {
        await users.updateOne({
            id: user.id,
            username: user.username,
        }, user, {
            upsert: true,
        });
        if (await getUser(user.username, user.password)) {
            console.log(`user ${user.username} inserted!`);
        }
    }
    catch (err) {
        console.log(`User could not be saved: ${err}`);
    }
}
async function createUser(user) {
    await updateUser(user);
}
async function emptyUsersCollection() {
    await users.deleteMany({});
}
module.exports = {
    getUser,
    createUser,
    updateUser,
    emptyUsersCollection,
};
