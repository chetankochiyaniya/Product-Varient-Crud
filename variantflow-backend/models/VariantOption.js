const db = require('../config/db');

class VariantOption {
    static async create({ variantCategoryId, value }) {
        const [result] = await db.execute(
            'INSERT INTO variantoptions (variant_category_id, value) VALUES (?, ?)',
            [variantCategoryId, value]
        );
        return result.insertId;
    }

    static async findByCategoryId(variantCategoryId) {
        const [rows] = await db.execute(
            `SELECT vo.*, vc.name AS category_name
             FROM variantoptions vo
             JOIN variantcategories vc ON vo.variant_category_id = vc.id
             WHERE vo.variant_category_id = ?`,
            [variantCategoryId]
        );
        return rows;
    }

    static async findAllWithCategoryName() {
        const [rows] = await db.execute(
            `SELECT vo.*, vc.name AS category_name
             FROM variantoptions vo
             JOIN variantcategories vc ON vo.variant_category_id = vc.id`
        );
        return rows;
    }
}

module.exports = VariantOption;
