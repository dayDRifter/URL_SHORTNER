import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    original: {
      type: String,
      required: true,
    },
    shortid: {
      type: String,
      required: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      // required: true,
    },
  },
  { timestamps: true }
);

export const Url = mongoose.model("Url", urlSchema);
