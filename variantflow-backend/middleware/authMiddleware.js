const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../utils/jwtUtils');

exports.authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token.' });
    }
};