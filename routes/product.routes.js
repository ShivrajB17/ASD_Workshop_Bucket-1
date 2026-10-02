const express = require('express');
const productController = require('../controllers/product.controller');
const { cacheMiddleware, invalidateCacheMiddleware } = require('../middleware/cache.middleware');

const router = express.Router();

// Middleware for cache logic
router.use(cacheMiddleware);
router.use(invalidateCacheMiddleware);

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.patch('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
