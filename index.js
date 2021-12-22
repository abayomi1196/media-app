import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";

import { MONGODB } from "./config.js";
import { typeDefs } from "./types.js";
import { resolvers } from "./resolvers.js";

// instantiate server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// connect to db using mongoose and then launch server
mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`server running ar ${res.url}`);
  });
