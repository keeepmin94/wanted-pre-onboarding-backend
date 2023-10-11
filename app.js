import express from "express";
import dotenv from "dotenv";
//dotenv.config({ path: "./config/.env" });

import companyRouter from "./routes/company";
import userRouter from "./routes/user";
import applicantRouter from "./routes/applicant";
import noticeRouter from "./routes/notice";

const app = express();
app.use(express.json());

sequelize
  .sync()
  .then(() => console.log("connected database"))
  .catch((err) => console.error("occurred error in database connecting", err));

app.listen(3000, () => {
  console.log("started wanted internship server!");
});
