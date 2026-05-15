const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./src/config/db");
const authRouter = require("./src/routes/auth.routes");
const problemsRouter = require("./src/routes/problem.routes");
const draftsRouter = require("./src/routes/draft.routes");
const evaluateRouter = require("./src/routes/evaluate.routes");
const userRouter = require("./src/routes/user.routes");
const { authMiddleware } = require("./src/middlewares/user.middleware");
const morgan = require("morgan");

require("dotenv").config();

const app = express();

app.use(
    cors({
        origin: ["http://localhost:5173", "https://thinkstack-tw.netlify.app"],
        credentials: true,
    }),
);
app.use("/src/uploads", express.static("src/uploads"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.send("Welcome to Thinkify API!");
});
app.use("/api/auth", authRouter);
app.use("/api/problems", authMiddleware, problemsRouter);
app.use("/api/drafts", authMiddleware, draftsRouter);
app.use("/api/evaluate", authMiddleware, evaluateRouter);
app.use("/api/user", authMiddleware, userRouter);

app.listen(process.env.PORT, () => {
    console.log("\n\n--------------------");
    console.log("⚡⚡ Server Running on PORT: ", process.env.PORT);
    console.log("--------------------");

    connectDB();
});
