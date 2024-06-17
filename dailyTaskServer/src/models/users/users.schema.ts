import { Field, ObjectType, InputType } from 'type-graphql';
import { inherits } from 'util';

@ObjectType()
export class User {
  @Field()
  id!: number;
  @Field()
  username!: string;
  @Field()
  password!: string;
}

@InputType()
export class UserInput {
  @Field()
  username!: string;
  @Field()
  password!: string;
}

@InputType()
export class CompleteUserInput extends UserInput {
  @Field()
  id!: number;
}
