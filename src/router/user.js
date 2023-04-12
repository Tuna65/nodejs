const express = require("express");
const verifyToken = require("./../middleWare/auth");
const router = express.Router();
const userRouter = require("./../controller/userController");

router.get("/type=default", userRouter.listDefault);

router.get("/type=done", userRouter.listDone);

router.get("/type=null", userRouter.listNull);

module.exports = router;
