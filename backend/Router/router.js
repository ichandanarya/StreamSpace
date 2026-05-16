require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { env } = require("../config/env");
const router = express.Router();
const auth = require("./auth");
const Channel = require("./channel");
const Videos = require("./videos");
const Likes = require("./likes");
const Comments = require("./comments");
const Studio = require("./studio");
const Youtube = require("./youtube");

// Middlewares
router.use(
  cors({
    origin: env.CORS_ORIGINS,
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(auth);
router.use(Channel);
router.use(Videos);
router.use(Likes);
router.use(Comments);
router.use(Studio);
router.use(Youtube);

module.exports = router;
