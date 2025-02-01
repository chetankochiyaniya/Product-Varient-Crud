const express = require('express');
const variantController = require('../controllers/variantController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
router.get('/categories', variantController.getVariantCategory);
router.post('/categories', authMiddleware.authenticate, variantController.createVariantCategory);
router.get('/options', variantController.getVariantOption);
router.post('/options', authMiddleware.authenticate, variantController.createVariantOption);
router.post('/product-variants', authMiddleware.authenticate, variantController.createProductVariant);
router.post('/get-product-variants', authMiddleware.authenticate, variantController.getProductVariant);
router.post('/variant-images', authMiddleware.authenticate, variantController.createVariantImage);

module.exports = router;