import { Field, ID, ObjectType } from "type-graphql";
import { SalesOrder } from "./sales-order-model";

@ObjectType()
export class Client {
  @Field(type => ID)
  id: number;

  @Field()
  code: string;

  @Field()
  store: string;

  @Field()
  name: string;

  @Field()
  address: string

  @Field()
  email: string

  @Field()
  cgc: string
}