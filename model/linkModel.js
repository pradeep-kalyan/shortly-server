"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = void 0;
const mongoose_1 = require("mongoose");
const LinkSchema = new mongoose_1.default.Schema({
    org_url: { type: String, required: true, unique: true },
    short_url: { type: String, required: true },
    clicks: { type: Number, default: 0 },
}, { timestamps: true });
exports.Link = mongoose_1.default.model("link", LinkSchema);
