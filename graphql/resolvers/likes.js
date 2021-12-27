import { UserInputError } from "apollo-server";

import Post from "../../models/Post.js";
import checkAuth from "../../utils/checkAuth.js";

export default {
  Mutation: {
    async likePost(_, { postId }, context) {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);

      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          // post already liked - unlike
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          //not liked - like post
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }

        await post.save();
        return post;
      } else {
        throw new UserInputError("Post not found!!");
      }
    },
  },
};
