import { gql } from "apollo-server";

export const typeDefs = gql`
  type SinglePost {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }

  type Query {
    getPosts: [SinglePost]
  }
`;
