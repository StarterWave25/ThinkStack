const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectDB = require("./src/lib/db");
const authRouter = require("./src/routes/auth.routes");
const problemsRouter = require("./src/routes/problem.routes");
const { authMiddleware } = require("./src/middlewares/user.middleware");
const morgan = require("morgan");

require("dotenv").config();

const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://thinkstack-tw.netlify.app"
    ], credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.send("Welcome to Thinkify API!");
});
app.use("/api/auth", authRouter);
app.use("/api/problems", authMiddleware, problemsRouter);

app.listen(process.env.PORT, () => {
    console.log("\n\n--------------------");
    console.log("⚡⚡ Server Running on PORT: ", process.env.PORT);
    console.log("--------------------");

    connectDB();
});
