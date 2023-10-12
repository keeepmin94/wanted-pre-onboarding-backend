const express = require("express");
const router = express.Router();
const { registerCompany, getCompanys } = require("../controllers/company");

router.post("/register", registerCompany);

router.get("/", getCompanys);

module.exports = router;
