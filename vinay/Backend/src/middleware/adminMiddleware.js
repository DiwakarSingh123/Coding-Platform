const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const redisClient = require('../config/redisClient');

const adminMiddleware = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            throw new Error("You must be logged in");
        }

        const payload = jwt.verify(token, process.env.JWT_SECRATE_KEY);
        const { _id } = payload;

        if (!_id) {
            throw new Error("You must be logged in");
        }

        const result = await User.findById(_id);

        if(result.role !== 'admin')
            throw new Error("Invailed token");

        if (!result) {
            throw new Error("User doesn't exist");
        }

        // Check Redis token blocklist
        const isBlocked = await redisClient.exists(`token:${token}`);
        if (isBlocked) {
            throw new Error("Invalid user: token is blocked");
        }

        // Attach user to request
        req.user = result;

        // Call next middleware
        next();

    } catch (err) {
        res.status(401).send("Error: " + err.message);
    }
};

module.exports = adminMiddleware;
