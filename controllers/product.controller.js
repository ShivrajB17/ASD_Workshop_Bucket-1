const productService = require('../services/product.service');

const getProducts = (req, res) => {
  const products = productService.getAll();
  res.json(products);
};

const getProductById = (req, res) => {
  const product = productService.getById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

const createProduct = (req, res) => {
  const product = productService.create(req.body);
  res.status(201).json(product);
};

const updateProduct = (req, res) => {
  const product = productService.update(req.params.id, req.body);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

const deleteProduct = (req, res) => {
  const product = productService.remove(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
