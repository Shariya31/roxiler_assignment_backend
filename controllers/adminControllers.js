import TryCatch from "../utils/TryCatch.js";
import User from "../models/User.js";
import Store from "../models/Store.js"
import Rating from "../models/Ratting.js";
import Errorhandler from "../utils/Errorhandler.js";

export const getAdminDashboard = TryCatch(async(req, res, next)=>{
    const totalUsers = await User.countDocuments();
    const totoalStores = await Store.countDocuments();
    const totalRatings = await Store.aggregate([
        { $unwind: "$ratings"},
        { $count: "totalRatings"}
    ]);

    res.status(200).json({
        success: true,
        totalUsers,
        totoalStores,
        totalRatings: totalRatings.length > 0 ? totalRatings[0].totalRatings : 0,
    })
})

export const getAllUsers = TryCatch(async(req, res, next)=>{
    let {search, role, sortBy, order} = req.query;

    let query = {}

    if(search){
        query.$or = [
            {name: {$regex: search, $options: "i"} },
            {email: {$regex: search, $options: "i"} },
            {address: {$regex: search, $options: "i"} }
        ];
    }

    if(role){
        query.role = role
    }

    let sortOptions = {};

    if(sortBy) {
        order = order === "desc" ? -1 : 1
        sortOptions[sortBy] = order
    }

    const users = await User.find(query).populate({
        path: 'stores.store',
        select: 'name email address averageRating ratings'
    }).sort(sortOptions);

    res.status(200).json({
        success: true,
        users
    });
});

export const getAllStores = TryCatch(async(req, res, next)=>{
    let { search, sortBy, order } = req.query;
    let query = {};

    if (search) {
        query.$or = [
            { name: { $regex: search, $options: "i" } },
            { address: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i"} }
        ];
    }

    let sortOptions = {};
    if (sortBy) {
        order = order === "desc" ? -1 : 1;
        sortOptions[sortBy] = order;
    }

    const stores = await Store.find(query).sort(sortOptions).populate("owner", "name email");

    res.status(200).json({
        success: true,
        stores,
    })
})

export const getUserDetails = TryCatch(async(req, res, next)=>{
    const {id} = req.params

    const user = await User.findById(id).select('-password');

    if(!user) return next(new Errorhandler('User not found', 404));

    let stores = [];

    if(user.role === 'store_owner'){
        stores = await Store.find({owner: user._id}).select('name address ratings')
    }

    res.status(200).json({
        success: true,
        user,
        stores
    })
})