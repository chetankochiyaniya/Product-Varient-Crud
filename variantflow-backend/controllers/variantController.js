const VariantCategory = require('../models/VariantCategory');
const VariantOption = require('../models/VariantOption');
const ProductVariant = require('../models/ProductVariant');
const VariantImage = require('../models/VariantImage');

exports.createVariantCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const categoryId = await VariantCategory.create({ name });
        res.status(201).json({ id: categoryId, name });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getVariantCategory = async (req, res) => {
    try {
        const variants = await VariantCategory.findAll();
        res.status(200).json(variants);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createVariantOption = async (req, res) => {
    try {
        const { variantCategoryId, value } = req.body;
        const optionId = await VariantOption.create({ variantCategoryId, value });
        res.status(201).json({ id: optionId, variantCategoryId, value });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getVariantOption = async (req, res) => {
    try {
        const options = await VariantOption.findAllWithCategoryName();
        res.status(200).json(options);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createProductVariant = async (req, res) => {
    try {
        const { productId, variantOptionId, price } = req.body;
        const variantId = await ProductVariant.create({ productId, variantOptionId, price });
        res.status(201).json({ id: variantId, productId, variantOptionId, price: price });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getProductVariant = async (req, res) => {
    const { productId } = req.body;
    try {
        const variants = await ProductVariant.findByProductId(productId);
        res.status(200).json(variants);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createVariantImage = async (req, res) => {
    try {
        const { productVariantId, imageUrl, isMain } = req.body;
        const imageId = await VariantImage.create({ productVariantId, imageUrl, isMain });
        res.status(201).json({ id: imageId, productVariantId, imageUrl, isMain });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};