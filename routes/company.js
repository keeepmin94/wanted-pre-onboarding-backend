const express = require("express");
const router = express.Router();
const { registerCompany, getCompanys } = require("../controllers/company");

router.post("/", registerCompany);

router.get("/", getCompanys);

module.exports = router;
