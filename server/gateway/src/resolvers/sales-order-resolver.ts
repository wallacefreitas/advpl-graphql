import { Arg, Query, Resolver } from "type-graphql";
import { RESTDataSource,  } from "@apollo/datasource-rest";

import { SalesOrder } from "../models/sales-order-model";

@Resolver()
export class SalesOrderResolver extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.APP_URL_MS2;
  }

  @Query(() => [SalesOrder])
  async orders(@Arg("clientId") clientId: Number): Promise<[SalesOrder]> {
    return await this.get(`api/v1/client/${clientId.toString()}/orders`);
  }
}