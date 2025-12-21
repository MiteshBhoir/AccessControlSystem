import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    // Encrypted Aadhar
    aadhar: {
      type: String,
      required: true,
    },

    iv: {
      type: String,
      required: true,
    },
    aadharHash: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

const User = mongoose.model("User", userSchema);
export default User;
