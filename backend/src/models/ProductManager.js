const AbstractManager = require("./AbstractManager");

class ProductManager extends AbstractManager {
  setDatabase(database) {
    this.connection = database;
  }

  constructor() {
    super({ table: "product" });
  }
}

module.exports = ProductManager;
