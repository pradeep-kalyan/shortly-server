"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const Shortner_1 = __importDefault(require("./routes/Shortner"));
const app = (0, express_1.default)();
// Error handler middleware with proper types
const ErrorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message || "Something went wrong!" });
};
(0, db_1.default)()
    .then(() => console.log("DB connected"))
    .catch((err) => console.error("DB connection error", err));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("API is running...");
});
app.use("/shortly", Shortner_1.default);
// Error middleware should be last
app.use(ErrorHandler);
app.listen(5000, () => {
    console.log("Server started on port 5000");
});
