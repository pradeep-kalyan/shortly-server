"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirecturl = exports.urlgenerator = void 0;
const crypto_1 = __importDefault(require("crypto"));
const linkModel_1 = require("../model/linkModel");
const charset =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const generateShortUrl = () => {
  let short_url = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = crypto_1.default.randomInt(0, charset.length);
    short_url += charset[randomIndex];
  }
  return short_url;
};
const urlgenerator = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { org_url } = req.body;
      if (!org_url) {
        return res.status(400).json({ message: "Original URL is required." });
      }
      const existing = yield linkModel_1.Link.findOne({ org_url });
      if (existing) {
        return res.status(200).json({
          message: `URL already shortened: https://shortly/${existing.short_url}`,
        });
      }
      const short_url = generateShortUrl();
      yield linkModel_1.Link.create({ org_url, short_url });
      return res.status(200).json({
        message: `Short URL created successfully. Access: https://shortly/${short_url}`,
      });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  });
exports.urlgenerator = urlgenerator;
const redirecturl = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { shorturl } = req.params;
      const URL = yield linkModel_1.Link.findOne({ short_url: shorturl });
      if (!URL) {
        return res.status(404).json({ message: "Short URL not found." });
      } else {
        URL.clicks++;
        yield URL.save();
        res.redirect(URL.org_url);
      }
      // res.status(200).json({ message: "redirecting please wait ...." });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  });
exports.redirecturl = redirecturl;
