import TryCatch from "../utils/TryCatch.js";
import User from "../models/User.js";
import Store from "../models/Store.js"
import Rating from "../models/Ratting.js";
import Errorhandler from "../utils/Errorhandler.js";
export const getAdminDashboard = TryCatch(async(req, res, next)=>{
    const totalUsers = await User.countDocuments();
    const totoalStores = await Store.countDocuments();
    const totalRatings = await Rating.countDocuments();

    res.status(200).json({
        success: true,
        totalUsers,
        totoalStores,
        totalRatings
    })
})