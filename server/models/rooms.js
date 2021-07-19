import mongoose from "mongoose";

const Rooms = mongoose.Schema(
  {
    roomName: { type: String, required: true },
    roomId: { type: String, required: true },
    roomOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    roomPhotoURL: { type: String, required: true },
    type: { type: String, required: true },
    createdId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("rooms", Rooms);
