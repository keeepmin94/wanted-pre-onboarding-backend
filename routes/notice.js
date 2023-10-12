const express = require("express");
const router = express.Router();
const { registerNotice, updateNotice } = require("../controllers/notice");

router.post("/", registerNotice);
router.patch("/", updateNotice);

module.exports = router;
