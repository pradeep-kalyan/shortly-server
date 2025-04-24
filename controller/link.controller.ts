import { Request, Response } from "express";
import crypto from "crypto";
import { Link } from "../model/linkModel";

const charset =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const generateShortUrl = (): string => {
  let short_url = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = crypto.randomInt(0, charset.length);
    short_url += charset[randomIndex];
  }
  return short_url;
};

export const urlgenerator = async (req: any, res: any) => {
  try {
    const { org_url } = req.body;

    if (!org_url) {
      return res.status(400).json({ message: "Original URL is required." });
    }

    const existing = await Link.findOne({ org_url });
    if (existing) {
      return res.status(200).json({
        message: `URL already shortened: https://sniply.up.railway.app/${existing.short_url}`,
      });
    }

    const short_url = generateShortUrl();
    await Link.create({ org_url, short_url });

    return res.status(200).json({
      message: `Short URL created successfully. Access: https://sniply.up.railway.app/r/${short_url}`,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const redirecturl = async (req: any, res: any) => {
  try {
    const { shorturl } = req.params;
    const URL = await Link.findOne({ short_url: shorturl });

    if (!URL) {
      return res.status(404).json({ message: "Short URL not found." });
    } else {
      URL.clicks++;
      await URL.save();
      res.redirect(URL.org_url);
    }
    // res.status(200).json({ message: "redirecting please wait ...." });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
