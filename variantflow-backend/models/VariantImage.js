const db = require('../config/db');

class VariantImage {
    static async create({ productVariantId, imageUrl, isMain }) {
        const [result] = await db.execute(
            'INSERT INTO variant_images (product_variant_id, image_url, is_main) VALUES (?, ?, ?)',
            [productVariantId, imageUrl, isMain]
        );
        return result.insertId;
    }

    static async findByVariantId(productVariantId) {
        const [rows] = await db.execute('SELECT * FROM variant_images WHERE product_variant_id = ?', [
            productVariantId,
        ]);
        return rows;
    }
}

module.exports = VariantImage;