import { Field, ObjectType, InputType } from 'type-graphql';

@ObjectType()
export class User {
  @Field()
  id!: number;
  @Field()
  username!: string;
  @Field()
  password!: String;
}
