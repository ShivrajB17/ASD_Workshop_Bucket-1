const express = require('express');
const productRoutes = require('./routes/product.routes');

const app = express();
app.use(express.json());

// Routes
app.use('/products', productRoutes);

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
