"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const link_controller_1 = require("../controller/link.controller");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.json({ message: "get request successful" });
});
router.post("/shorten", link_controller_1.urlgenerator);
router.get("/r/:shorturl", link_controller_1.redirecturl);
exports.default = router;
