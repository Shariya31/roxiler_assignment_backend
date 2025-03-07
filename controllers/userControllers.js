import User from "../models/User.js";
import Errorhandler from "../utils/Errorhandler.js";
import TryCatch from "../utils/TryCatch.js";

export const getAllUsers = TryCatch(async(req, res, next)=>{
    const users = await User.find().select('-password')
    if(!users) return next(new Errorhandler('No users found', 404))
    res.status(200).json({
        success: true, 
        users
    })
})

export const createUser = TryCatch(async(req, res, next)=>{
    const {name, email, password, address, role} = req.body;

    if(!name || !email || !password || !address) return next(new Errorhandler('Please fill all the fields', 400))

    const userExist = await User.findOne({email})
    if(userExist) return next(new Errorhandler('User already exists | Try to login', 400))

    const userRole = req.user?.role === "admin" ? role : "user";

    const newUser = await User.create({
        name,
        email, 
        password,
        address,
        role: userRole
    })

    if(!newUser) return next(new Errorhandler('Error in creating the user', 500))

    res.status(201).json({
        success: true,
        message: "User is created successfully",
        newUser
    })
})

export const getUserDetails = TryCatch(async(req, res, next)=>{
    const user = await User.findById(req.user.id).select('-password')
    if(!user) return next(new Errorhandler("User not found", 404))
    res.status(200).json({
        success: true,
        user
    })
})