import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { UserResolver } from "./UserResolver";

(async () => {
    const app = express();

    await createConnection();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver]
        })
    });

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log("Express server started");
    });
})();
