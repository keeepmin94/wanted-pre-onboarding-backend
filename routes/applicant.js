const express = require("express");
const router = express.Router();
const { registerApplicant } = require("../controllers/applicant");

router.post("/", registerApplicant);

module.exports = router;
