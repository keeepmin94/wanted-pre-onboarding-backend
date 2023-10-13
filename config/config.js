require("dotenv").config();
const env = process.env;

const development = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE || "wanted_db",
  host: env.MYSQL_HOST,
  port: 3306,
  dialect: "mysql",
};

const production = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE || "wanted_db",
  host: env.MYSQL_HOST,
  port: 3306,
  dialect: "mysql",
};

const test = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE || "wanted_db",
  host: env.MYSQL_HOST,
  port: 3306,
  dialect: "mysql",
};

module.exports = { development, production, test };
