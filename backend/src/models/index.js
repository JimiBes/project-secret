require("dotenv").config();

const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

pool.getConnection().catch(() => {
  console.warn(
    "Warning:",
    "Failed to get a DB connection.",
    "Did you create a .env file with valid credentials?",
    "Routes using models won't work as intended"
  );
});

const models = {};

const ProductManager = require("./ProductManager");

models.product = new ProductManager();
models.product.setDatabase(pool);

const files = fs
  .readdirSync(__dirname)
  .filter((file) => file !== "AbstractManager.js" && file !== "index.js");

for (const file of files) {
  const Manager = require(path.join(__dirname, file));
  models[Manager.table] = new Manager();
  models[Manager.table].setDatabase(pool);
}

const handler = {
  get(obj, prop) {
    if (prop in obj) {
      return obj[prop];
    }

    const pascalize = (string) =>
      string.slice(0, 1).toUpperCase() + string.slice(1);

    throw new ReferenceError(
      `models.${prop} is not defined. Did you create ${pascalize(
        prop
      )}Manager.js, and did you register it in backend/src/models/index.js?`
    );
  },
};

module.exports = new Proxy(models, handler);
