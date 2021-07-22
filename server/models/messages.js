import mongoose from "mongoose";

const MessageShcema = mongoose.Schema(
  {
    userName: { type: String, required: true },
    message: { type: String, default: "" },
    photoURL: { type: String, required: true },
    reciverId: { type: String, required: true },
    senderId: { type: String, required: true },
    emailId: { type: String, required: true },
    ids: { type: String, required: true },
    roomId: { type: String, required: true },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("messages", MessageShcema);
