import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema(
  {
    org_url: { type: String, required: true, unique: true },
    short_url: { type: String, required: true },
    clicks: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Link = mongoose.model("link", LinkSchema);
