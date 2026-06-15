import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const AnonymousSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
  },
  otp: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  lastReported: {
    type: Date,
  },
});

const Anonymous =
  mongoose.models.Anonymous || mongoose.model("Anonymous", AnonymousSchema);

export { Anonymous };
