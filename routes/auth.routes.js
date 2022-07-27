const express = require("express");
const { verify } = require("jsonwebtoken");
const { register, signIn } = require("../controllers/auth");

const router = express.Router();

router.post("/register", register);
router.post("/signin", signIn);

module.exports = router;
