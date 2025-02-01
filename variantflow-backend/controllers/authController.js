const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { jwtSecret, refreshTokenSecret } = require('../utils/jwtUtils');

// Helper function to generate tokens
const generateTokens = (user) => {
    const accessToken = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET || jwtSecret,
        { expiresIn: '15m' } // Shorter expiry for access token
    );

    const refreshToken = jwt.sign(
        { id: user.id, username: user.username },
        process.env.REFRESH_TOKEN_SECRET || refreshTokenSecret,
        { expiresIn: '7d' } // Longer expiry for refresh token
    );

    return { accessToken, refreshToken };
};

// Login controller
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Fetch user from the database
        const user = await User.findByUsername(username);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare hashed passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate tokens
        const { accessToken, refreshToken } = generateTokens(user);

        // Send tokens in response
        res.json({ accessToken, refreshToken });

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Register controller
exports.register = async (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findByUsername(username);
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Hash password before saving to database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into database
        await User.createUser(username, hashedPassword);

        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ error: 'Refresh token is required' });
    }

    try {
        // Verify the refresh token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || refreshTokenSecret);

        // Fetch user from the database
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ error: 'Invalid refresh token' });
        }

        // Generate a new access token
        const accessToken = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET || jwtSecret,
            { expiresIn: '60m' }
        );

        res.json({ accessToken });

    } catch (error) {
        res.status(401).json({ error: 'Invalid refresh token' });
    }
};