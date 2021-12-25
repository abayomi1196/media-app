import { gql } from "apollo-server";

export const typeDefs = gql`
  type SinglePost {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }

  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Query {
    getPosts: [SinglePost]
    getPost(postId: ID!): SinglePost!
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): SinglePost!
    deletePost(postId: ID!): String!
  }
`;
