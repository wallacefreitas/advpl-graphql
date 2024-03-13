import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class SalesOrder {
  @Field(_type => ID)
  id: number;

  @Field()
  code: string;

  @Field(() => [SalesOrderItem])
  items: SalesOrderItem[]
}

@ObjectType()
export class SalesOrderItem {
  @Field()
  item: string;

  @Field()
  product: string;
}