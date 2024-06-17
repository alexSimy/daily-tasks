import * as usersModel from './users.model';
import { Query, Resolver, Mutation, Arg } from 'type-graphql';
import { CompleteUserInput, User, UserInput } from './users.schema';

@Resolver(() => User)
export class UsersResolver {
  @Query(() => User)
  async getUser(
    @Arg('username') username: string,
    @Arg('password') password: string
  ): Promise<User> {
    return await usersModel.getUser(username, password);
  }

  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return await usersModel.getAllUsers();
  }

  @Mutation(() => User)
  async createUser(@Arg('user') user: UserInput): Promise<User | undefined> {
    return await usersModel.createUser(user);
  }

  @Mutation(() => User)
  async updateUser(
    @Arg('user') user: CompleteUserInput
  ): Promise<User | undefined> {
    return await usersModel.updateUser(user);
  }
}
