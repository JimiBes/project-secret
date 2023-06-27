const models = require("../models");

const getAllProducts = (req, res) => {
  models.product
    .findAll()
    .then(([result]) => {
      if (result.length) {
        res.status(200).json(result);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const addProduct = (req, res) => {
  const product = req.body;
  models.product
  .insert(product)
  .then(([result]) => {
    res.location(`/products/${result.insertId}`).sendStatus(201);
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(500);
  });
}

module.exports = {
  getAllProducts,
  addProduct
};
