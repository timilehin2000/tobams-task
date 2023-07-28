const express = require("express");
const { dashboard } = require("../controllers/dashboard.controller");
const loginRequired = require("../middleware/auth");

const dashboardRouter = express.Router();

dashboardRouter.get("/dashboard", loginRequired, dashboard);

module.exports = dashboardRouter;
