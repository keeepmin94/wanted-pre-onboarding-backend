const express = require("express");
const router = express.Router();
const {
  registerApplicant,
  getApplicants,
} = require("../controllers/applicant");

router.post("/:id", registerApplicant);

router.get("/", getApplicants);

module.exports = router;
