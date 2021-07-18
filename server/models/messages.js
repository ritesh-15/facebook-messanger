import mongoose from "mongoose";

const MessageShcema = mongoose.Schema(
  {
    userName: { type: String, required: true },
    message: { type: String, required: true },
    photoURL: { type: String, required: true },
    reciverId: { type: String, required: true },
    senderId: { type: String, required: true },
    emailId: { type: String, required: true },
    ids: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("messages", MessageShcema);
