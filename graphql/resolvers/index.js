import postsResolvers from "./posts.js";
import userResolvers from "./users.js";
import commentsResolvers from "./comments.js";

export default {
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation,
  },
};
