const express = require("express");
const app = express();
const authRouter = require("./auth");
const movieRouter = require("./movies");


//creating a new router
const router = express.Router();
//api/auth/...
router.use("/auth", authRouter);
//api/auth/...
router.use("/movies", movieRouter);

module.exports = router;