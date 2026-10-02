let products = [
  { id: 1, name: 'Product 1', price: 100 },
  { id: 2, name: 'Product 2', price: 200 }
];

module.exports = {
  getProducts: () => products,
  getProductById: (id) => products.find(p => p.id === parseInt(id)),
  createProduct: (product) => {
    const newProduct = { id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1, ...product };
    products.push(newProduct);
    return newProduct;
  },
  updateProduct: (id, data) => {
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index !== -1) {
      products[index] = { ...products[index], ...data };
      return products[index];
    }
    return null;
  },
  deleteProduct: (id) => {
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index !== -1) {
      const deleted = products.splice(index, 1);
      return deleted[0];
    }
    return null;
  }
};
