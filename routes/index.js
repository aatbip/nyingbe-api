const express = require("express");
const authRouter = require("./auth.routes");
const noteRouter = require("./note.routes");

const router = express.Router();
router.use("/auth", authRouter);
router.use("/notes", noteRouter);

module.exports = router;
