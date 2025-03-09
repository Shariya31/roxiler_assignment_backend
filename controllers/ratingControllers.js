import Store from "../models/Store.js";
import Errorhandler from "../utils/Errorhandler.js";
import TryCatch from "../utils/TryCatch.js";

export const submitRating = TryCatch(async(req, res, next)=>{
    const {rating} = req.body;
    const id = req.params.id
    const store = await Store.findById(id);

    if(!store) return next(new Errorhandler('Store not found', 404));

    const existingRating = store.ratings.find((r) => r.user.toString() === req.user.id);

    if(existingRating){
        existingRating.rating = rating
    }else{
        store.ratings.push({user: req.user.id, rating})
    }

    store.calculateAverageRating();
    await store.save();

    res.status(200).json({
        success: true,
        message: 'Rated Successfully',
        store
    });
});

export const getMyRatings = TryCatch(async(req, res, next)=>{
    const store = await Store.findById(req.params.id);

    if(!store) return next(new Errorhandler('Store not found', 404));

    const userRating = store.ratings.find((r) => r.user.toString() === req.user.id);

    res.status(200).json({
        success: true,
        rating: userRating ? userRating: null
    })
})