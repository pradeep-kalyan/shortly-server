"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const link_controller_1 = require("../controller/link.controller");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.json({ message: "get request successful" });
});
router.post("/shorten", link_controller_1.urlgenerator);
router.get("/r/:shorturl", link_controller_1.redirecturl);
exports.default = router;
