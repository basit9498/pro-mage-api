const express = require("express");

const UserRouter = require("./user.route");
const ProjectRouter = require("./project.route");

const { Router } = express;
const router = Router();

router.use("/user", UserRouter);
router.use("/project", ProjectRouter);

module.exports = router;
