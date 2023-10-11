const express = require("express");
const dotenv = require("dotenv");
//dotenv.config({ path: "./config/.env" });
const { sequelize } = require("./models");
const userRouter = require("./routes/user.js");
const applicantRouter = require("./routes/applicant.js");
const noticeRouter = require("./routes/notice.js");
const companyRouter = require("./routes/company.js");

const app = express();
app.use(express.json());

sequelize
  .sync()
  .then(() => console.log("connected database"))
  .catch((err) => console.error("occurred error in database connecting", err));

app.listen(3000, () => {
  console.log("started wanted internship server!");
});
