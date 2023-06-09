import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    description: String,
    picturePath: {
      type:String,
      default:null,
    },
    status: {
      type: Boolean,
      default: true
    },
    edited: {
      type: Boolean,
      default: false
    }
  
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;