import postsResolvers from "./posts.js";
import userResolvers from "./users.js";
import commentsResolvers from "./comments.js";
import likesResolvers from "./likes.js";

export default {
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation,
    ...likesResolvers.Mutation,
  },
};
