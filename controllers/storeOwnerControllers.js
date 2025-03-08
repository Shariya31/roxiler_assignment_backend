import Store from "../models/Store.js";
import Errorhandler from "../utils/Errorhandler.js";
import TryCatch from "../utils/TryCatch.js";

export const getStoreOwnerDashboard = TryCatch(async(req, res, next)=>{
    const stores = await Store.find({ owner: req.user._id });

    if (!stores.length) {
        return next(new Errorhandler("No stores found for this owner", 404));
    }

    res.status(200).json({
        success: true,
        stores: stores.map((store) => ({
            name: store.name,
            email: store.email,
            address: store.address,
            averageRating: store.averageRating,
            ratings: store.ratings.map((rate) => ({
                user: rate.user,
                rating: rate.rating
            })),
        })),
    });
});