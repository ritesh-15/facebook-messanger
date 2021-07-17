import mongoose from "mongoose";

const MessageShcema = mongoose.Schema(
  {
    userName: { type: String, required: true },
    message: { type: String, required: true },
    profile: { type: String, required: true },
    userId: { type: String, required: true },
    userEmail: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("messages", MessageShcema);
