import express from "express";
import { redirecturl, urlgenerator } from "../controller/link.controller";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "get request successful" });
});

router.post("/shorten", urlgenerator);

router.get("/r/:shorturl", redirecturl);

export default router;
