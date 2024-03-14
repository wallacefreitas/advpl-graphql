import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Client } from "../models/client-model";
import { RESTDataSource,  } from "@apollo/datasource-rest";
import { SalesOrderResolver } from "./sales-order-resolver";
import { SalesOrder } from "../models/sales-order-model";

interface Context {
  dataSources: {
    salesOrderAPI: SalesOrderResolver
  }
}

@Resolver(() => Client)
export class ClientResolver extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.APP_URL_MS1;
  }

  @Query(() => Client)
  async client(@Arg("cgc") cgc: string): Promise<Client> {
    return await this.get(`api/v1/client/${cgc}`);
  }

  @FieldResolver(() => [SalesOrder])
  async orders(@Root() client: Client, @Ctx() ctx: Context) {
    return await ctx.dataSources.salesOrderAPI.orders(client.id)
  }
}