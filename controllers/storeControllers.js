import Store from "../models/Store.js";
import Errorhandler from "../utils/Errorhandler.js";
import TryCatch from "../utils/TryCatch.js";

export const createStore = TryCatch(async (req, res, next) => {
    const { name, email, address } = req.body;

    if (!name || !email || !address) return next(new Errorhandler('Please fill all the fields', 401))

    const storeExist = await Store.findOne({ email })

    if (storeExist) return next(new Errorhandler('Store already exists | Email in use', 400));

    const store = await Store.create({
        name, 
        email,
        address,
        owner: req.user
    })

    res.status(200).json({
        success: true,
        message: "Store created successfully",
        store
    })
})

export const getAllStores = TryCatch(async(req, res, next)=>{
    const {name, email, address} = req.query;

    let query = {}

    if(name) query.name = {$regex: name, $options:"i"};
    if(email) query.email = { $regex: email, $options: "i"};
    if(address) query.address = { $regex: address, $options: "i"};

    const stores = await Store.find(query);

    res.status(200).json({
        success: true,
        total: stores.length,
        stores
    });
});

export const getStoreDetails = TryCatch(async(req, res, next)=>{
    const store = await Store.findById(req.params.id);
    if(!store) return next(new Errorhandler("Store not found", 404))
    
    res.status(200).json({
        success: true,
        message: "Store found successfully",
        store
    })
})