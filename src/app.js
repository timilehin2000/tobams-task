const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDb = require("./config/db.config");
const authRouter = require("./routes/auth.routes");
const dashboardRouter = require("./routes/dashboard.routes");

const app = express();

app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);

app.use(cors());

//route
app.use("/api/v1", authRouter);
app.use("/api/v1", dashboardRouter);

//handle unwanted route
app.use("/*", (req, res) => {
    res.status(404).json({
        message: "lol, You missed the right route",
        route: req.originalUrl,
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("app is running");

    connectDb();
});
