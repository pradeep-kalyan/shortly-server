"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const LinkSchema = new mongoose_1.default.Schema(
  {
    org_url: { type: String, required: true, unique: true },
    short_url: { type: String, required: true },
    clicks: { type: Number, default: 0 },
  },
  { timestamps: true }
);
exports.Link = mongoose_1.default.model("link", LinkSchema);
