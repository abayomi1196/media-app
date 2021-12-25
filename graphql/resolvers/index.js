import postsResolvers from "./posts.js";
import userResolvers from "./users.js";

export default {
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postsResolvers.Mutation,
  },
};
