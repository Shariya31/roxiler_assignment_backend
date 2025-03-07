import jwt from 'jsonwebtoken'
import Errorhandler from '../utils/Errorhandler.js'
import User from '../models/User.js'
import TryCatch from '../utils/TryCatch.js'

export const authenticateUser = TryCatch(async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return next(new Errorhandler("Unauthorized no token provided", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id)
    if (!req.user) {
        return next(new Errorhandler("User not found", 404));
    }
    next();
})

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new Errorhandler("Access Denied: Insufficient Permissions", 403));
        }
        next();
    };
};