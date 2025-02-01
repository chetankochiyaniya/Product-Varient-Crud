const db = require('../config/db');

class VariantCategory {
    static async create({ name }) {
        const [result] = await db.execute('INSERT INTO variantcategories (name) VALUES (?)', [name]);
        return result.insertId;
    }

    static async findAll() {
        const [rows] = await db.execute('SELECT * FROM variantcategories');
        return rows;
    }
}

module.exports = VariantCategory;