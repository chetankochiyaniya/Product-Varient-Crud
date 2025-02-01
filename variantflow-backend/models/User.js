const db = require('../config/db');

class User {
    static async findByUsername(username) {
        const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
        return rows[0]; // Return the first user found
    }

    static async createUser(username, hashedPassword) {
        // Ensure the parameters are not undefined
        if (!username || !hashedPassword) {
            throw new Error('Missing required fields');
        }

        await db.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
    }
}

module.exports = User;
