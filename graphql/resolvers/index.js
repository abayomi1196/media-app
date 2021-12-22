import postsResolvers from "./posts.js";

export default {
  Query: {
    ...postsResolvers.Query,
  },
};
