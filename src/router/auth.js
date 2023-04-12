const express = require("express");
const verifyToken = require("../middleWare/auth");
const router = express.Router();
const authRouter = require("./../controller/authController");

router.post("/login", authRouter.index);

router.post("/register", authRouter.send);

router.get("/", verifyToken, authRouter.getUser);

module.exports = router;
