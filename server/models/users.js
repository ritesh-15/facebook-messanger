import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    userName: { type: String, required: true },
    emailId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photoURL: { type: String, required: true },
    path: { type: String, required: true },
    fileName: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("users", UserSchema);
