const express = require("express");
const verifyToken = require("../middleWare/auth");
const router = express.Router();
const templateRouter = require("./../controller/templateController");

// router.get("/done", verifyToken, templateRouter.getDone);

router.get("/check", verifyToken, templateRouter.check);

router.post("/post", verifyToken, templateRouter.post);

router.get("/tcheck=done", templateRouter.getDone);

router.get("/:userId", templateRouter.edit);

router.put("/:_id/update", verifyToken, templateRouter.update);

module.exports = router;
