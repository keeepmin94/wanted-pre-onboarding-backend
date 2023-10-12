const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
//dotenv.config({ path: "./config/.env" });
const { sequelize } = require("./models");
const userRouter = require("./routes/user.js");
const applicantRouter = require("./routes/applicant.js");
const noticeRouter = require("./routes/notice.js");
const companyRouter = require("./routes/company.js");

const app = express();
app.use(express.json());
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

app.use("/company", companyRouter);
app.use("/user", userRouter);
app.use("/notice", noticeRouter);

sequelize
  .sync({ force: false })
  .then(() => console.log("connected database"))
  .catch((err) => console.error("occurred error in database connecting", err));

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = err;
  res.status(err.status || 500);
  res.render("error");
});

app.listen(3000, () => {
  console.log("started wanted internship server!");
});
