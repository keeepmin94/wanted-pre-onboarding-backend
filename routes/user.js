const express = require("express");
const router = express.Router();
const { registerUser, getUsers } = require("../controllers/user");

router.post("/", registerUser);

router.get("/", getUsers);

module.exports = router;
