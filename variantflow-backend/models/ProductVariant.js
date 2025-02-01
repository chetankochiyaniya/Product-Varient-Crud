const db = require("../config/db");

class ProductVariant {
    static async create({ productId, variantOptionId, price }) {
        const [result] = await db.execute(
            "INSERT INTO productvariants (product_id, variant_option_id, price) VALUES (?, ?, ?)",
            [productId, variantOptionId, price]
        );
        return result.insertId;
    }

    static async findByProductId(productId) {
        try {
            const sqlQuery = `
             SELECT
    pv.id AS product_variant_id,
    pv.product_id,
    pv.price,
    JSON_OBJECTAGG(vc.name, vo.value) AS variant_options
FROM
    ProductVariants pv
JOIN
    VariantOptions vo ON JSON_CONTAINS(pv.variant_option_id, CAST(vo.id AS JSON), '$')
JOIN
    VariantCategories vc ON vo.variant_category_id = vc.id
WHERE
    pv.product_id = ?
GROUP BY
    pv.id, pv.product_id, pv.price;
        `;

            const [rows] = await db.execute(sqlQuery, [productId]);

            return rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProductVariant;
