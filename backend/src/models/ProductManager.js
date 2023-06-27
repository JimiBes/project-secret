const AbstractManager = require("./AbstractManager");

class ProductManager extends AbstractManager {
  setDatabase(database) {
    this.connection = database;
  }

  constructor() {
    super({ table: "product" });
  }

  insert(product) {
    return this.connection.query(`insert into ${this.table} set ?`, product);
  }
}

module.exports = ProductManager;
