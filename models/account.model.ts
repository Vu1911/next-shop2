import mongoose from "mongoose";
import { Model } from "mongoose";
import { IAccount } from "../interfaces/account.interface";

let Schema = mongoose.Schema;

let userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    maxLength: [30, "{VALUE} is too long!"],
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    match: /.+\@.+\..+/,
  },
  dob: {
    type: Date,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    enum: {
      values: ["Admin", "User"],
      message: "{VALUE} is not supported!",
    },
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ["Activated", "Deactivated"],
      message: "{VALUE} is not supported!",
    },
  },
});

const User: Model<IAccount> = mongoose.models.User || mongoose.model('User', userSchema);

export default User

