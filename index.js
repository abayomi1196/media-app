import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";

import { MONGODB } from "./config.js";
import { typeDefs } from "./graphql/types.js";
import resolvers from "./graphql/resolvers/index.js";

const PORT = process.env.port || 5000;

// instantiate server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

// connect to db using mongoose and then launch server
mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`server running ar ${res.url}`);
  })
  .catch((err) => {
    console.error(err);
  });
