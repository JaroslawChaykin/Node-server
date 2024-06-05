import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    nickname: {
      type: String,
      required: true,
      unique: true
    },
    birthday: {
      type: Date,
      required: true
    },
    firstName: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatarUrl: String,
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", UserSchema)
export default UserModel;
