const db = require('../config/db');

class Product {
    static async create({ name, description }) {
        const [result] = await db.execute(
            'INSERT INTO products (name, description) VALUES (?, ?)',
            [name, description]
        );
        return result.insertId;
    }

    static async findAll() {
        const [rows] = await db.execute('SELECT * FROM products');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [id]);
        return rows[0];
    }

    static async update(id, { name, description }) {
        await db.execute(
            'UPDATE products SET name = ?, description = ? WHERE id = ?',
            [name, description, id]
        );
    }

    static async delete(id) {
        await db.execute('DELETE FROM products WHERE id = ?', [id]);
    }
}

module.exports = Product;