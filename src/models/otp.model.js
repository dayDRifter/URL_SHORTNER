import mongoose from "mongoose";

const otpSchema = {
  email: {
    type: String,
    required: true,
  },
  code: {
    type: Number,
    required: true,
  },
  expiry: {
    type: Date,
    default: Date(Date.now + 10000 * 60),
    // Date.now=10000,
  },
};
export const Otp = mongoose.model("Otp", otpSchema);
