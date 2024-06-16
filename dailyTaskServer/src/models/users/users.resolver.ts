const usersModel = require('./users.model');
import { Query, Resolver, Mutation, Arg } from 'type-graphql';
import { User } from './users.schema';

@Resolver(() => User)
export class UsersResolver {
  @Query(() => User)
  async getUser(
    @Arg('username') username: string,
    @Arg('password') password: string
  ): Promise<User> {
    return await usersModel.getUser(username, password);
  }
}
