
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String },
    middleName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    subscriptionLevel: { type: String, default: "гість" },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
