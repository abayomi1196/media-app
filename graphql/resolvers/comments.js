import { UserInputError } from "apollo-server";

import Post from "../../models/Post.js";
import checkAuth from "../../utils/checkAuth.js";

export default {
  Mutation: {
    async createComment(_, { postId, body }, context) {
      const { username } = checkAuth(context);

      if (body.trim === "") {
        throw new UserInputError("Empty comment", {
          errors: {
            body: "Comment body must not be empty!",
          },
        });
      }

      const post = await Post.findById(postId);

      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });

        await post.save();

        return post;
      } else {
        throw new UserInputError("Post not found!");
      }
    },
  },
};
