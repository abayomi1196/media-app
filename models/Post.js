import pkg from "mongoose";
const { model, Schema } = pkg;

const postSchema = new Schema({
  body: String,
  username: String,
  createdAt: String,
  comments: [{ body: String, username: String, createdAt: String }],
  likes: [{ username: String, createdAt: String }],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

export default model("Post", postSchema);
