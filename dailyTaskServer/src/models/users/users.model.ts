import { GraphQLError } from 'graphql';

import { User, UserInput } from './users.schema';
import users from './users.mongo';

export async function getUser(
  username: string,
  password: string
): Promise<User> {
  console.log(username, password);

  const foundUser: User | undefined | null = await users.findOne({
    username: username,
  });
  console.log(JSON.stringify(foundUser));
  //decrypt User's password using bcrypt
  if (!foundUser) {
    throw new GraphQLError(`Wrong username!`, {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }
  if (foundUser && foundUser.password === password) {
    return foundUser;
  } else {
    throw new GraphQLError(`Wrong password!`, {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }
}

export async function getAllUsers(): Promise<User[]> {
  const usersList = await users.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
  return usersList;
}

export async function updateUser(user: User): Promise<User | undefined> {
  try {
    await users.updateOne(
      {
        id: user.id,
      },
      user,
      {
        upsert: true,
      }
    );
    const insertedUser = await getUser(user.username, user.password);
    if (insertedUser) {
      console.log(`user ${user.username} inserted!`);
      return insertedUser;
    } else {
      throw new GraphQLError(`Cannot update User!`, {
        extensions: { code: 'UPDATE ERROR!' },
      });
    }
  } catch (err) {
    console.log(`User could not be saved: ${err}`);
  }
}

export async function createUser(user: UserInput): Promise<User | undefined> {
  const newUser: User = {
    id: users.length,
    username: user.username,
    password: user.password,
  };
  return await updateUser(newUser);
}

export async function deleteUser(user: User) {}

export async function emptyUsersCollection() {
  await users.deleteMany({});
}
