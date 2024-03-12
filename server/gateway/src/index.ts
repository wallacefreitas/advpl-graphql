import "reflect-metadata";

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSchema } from "type-graphql";
import { resolve } from 'path'
import dotenv from 'dotenv'
import path from "path";

import { ClientResolver } from './resolvers/client-resolver'
import { SalesOrderResolver } from "./resolvers/sales-order-resolver";

dotenv.config({
  path: resolve(__dirname, "config/.env")
})

async function bootstrap() { 
  const schema = await buildSchema({
    resolvers: [
      ClientResolver,
      SalesOrderResolver,
    ],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql')
  });

  const server = new ApolloServer({
    schema
  });

  const { url } = await startStandaloneServer(server, {
    context: async () => {
      return {
        dataSources: {
          clientsAPI: new ClientResolver(),
          salesOrderAPI: new SalesOrderResolver()
        }
      }
    },
    listen: { 
      port: parseInt(process.env.APOLLO_PORT || '') 
    }
  });

  console.log(`🚀  Server ready at: ${url}`);
}

bootstrap();