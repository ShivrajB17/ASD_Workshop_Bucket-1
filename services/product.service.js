const db = require('../database');

module.exports = {
  getAll: () => db.getProducts(),
  getById: (id) => db.getProductById(id),
  create: (product) => db.createProduct(product),
  update: (id, product) => db.updateProduct(id, product),
  remove: (id) => db.deleteProduct(id)
};
