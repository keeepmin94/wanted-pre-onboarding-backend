import express from "express";
import dotenv from "dotenv";
//dotenv.config({ path: "./config/.env" });

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("백엔드 API 서버가 켜졌어요!!!");
});
