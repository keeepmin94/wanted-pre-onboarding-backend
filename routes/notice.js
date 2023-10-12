const express = require("express");
const router = express.Router();
const {
  registerNotice,
  updateNotice,
  deleteNotice,
  getAllNotices,
  getNotice,
} = require("../controllers/notice");

router.get("/", getAllNotices);
router.get("/:id", getNotice);
router.post("/", registerNotice);
router.patch("/:id", updateNotice);
router.delete("/:id", deleteNotice);

module.exports = router;
