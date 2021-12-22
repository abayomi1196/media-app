import { ApolloServer, gql } from "apollo-server";
import mongoose from "mongoose";

import { MONGODB } from "./config.js";

const typeDefs = gql`
  type Query {
    sayHi: String!
  }
`;

const resolvers = {
  Query: {
    sayHi: () => "Hello World!!",
  },
};

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
